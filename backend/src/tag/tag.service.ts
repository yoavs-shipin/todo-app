import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Tag } from './tag.entity';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

@Injectable()
export class TagService {
  private tags: Map<string, Tag> = new Map();

  findAll(): Tag[] {
    return Array.from(this.tags.values());
  }

  findOne(id: string): Tag {
    const tag = this.tags.get(id);
    if (!tag) throw new NotFoundException(`Tag ${id} not found`);
    return tag;
  }

  create(dto: CreateTagDto): Tag {
    const duplicate = Array.from(this.tags.values()).find(
      (t) => t.name.toLowerCase() === dto.name.toLowerCase(),
    );
    if (duplicate) {
      throw new ConflictException(
        `Tag with name "${dto.name}" already exists`,
      );
    }

    const tag: Tag = {
      id: uuidv4(),
      name: dto.name,
      color: dto.color,
    };
    this.tags.set(tag.id, tag);
    return tag;
  }

  update(id: string, dto: UpdateTagDto): Tag {
    const tag = this.findOne(id);

    if (dto.name !== undefined) {
      const duplicate = Array.from(this.tags.values()).find(
        (t) => t.id !== id && t.name.toLowerCase() === dto.name!.toLowerCase(),
      );
      if (duplicate) {
        throw new ConflictException(
          `Tag with name "${dto.name}" already exists`,
        );
      }
    }

    const updated: Tag = {
      ...tag,
      ...Object.fromEntries(
        Object.entries(dto).filter(([, v]) => v !== undefined),
      ),
    };
    this.tags.set(id, updated);
    return updated;
  }

  remove(id: string): void {
    if (!this.tags.delete(id)) {
      throw new NotFoundException(`Tag ${id} not found`);
    }
  }
}
