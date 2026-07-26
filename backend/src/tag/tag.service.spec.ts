import { NotFoundException, ConflictException } from '@nestjs/common';
import { TagService } from './tag.service';

describe('TagService', () => {
  let service: TagService;

  beforeEach(() => {
    service = new TagService();
  });

  it('creates a tag with id, name, and color', () => {
    const tag = service.create({ name: 'Work', color: '#FF0000' });
    expect(tag.id).toBeDefined();
    expect(tag.name).toBe('Work');
    expect(tag.color).toBe('#FF0000');
  });

  it('rejects duplicate name (case-insensitive)', () => {
    service.create({ name: 'Work', color: '#FF0000' });
    expect(() => service.create({ name: 'work', color: '#00FF00' })).toThrow(
      ConflictException,
    );
  });

  it('updates name and color', () => {
    const tag = service.create({ name: 'Work', color: '#FF0000' });
    const updated = service.update(tag.id, {
      name: 'Personal',
      color: '#00FF00',
    });
    expect(updated.name).toBe('Personal');
    expect(updated.color).toBe('#00FF00');
  });

  it('removes a tag from findAll', () => {
    const tag = service.create({ name: 'Work', color: '#FF0000' });
    service.remove(tag.id);
    expect(service.findAll()).toHaveLength(0);
  });

  it('throws NotFoundException for missing ID', () => {
    expect(() => service.findOne('nonexistent')).toThrow(NotFoundException);
  });
});
