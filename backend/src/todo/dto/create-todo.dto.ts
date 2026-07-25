import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsDateString,
} from 'class-validator';
import { TodoPriority } from '../todo.entity';

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(TodoPriority)
  @IsOptional()
  priority?: TodoPriority;

  @IsOptional()
  @IsDateString()
  dueDate?: string;
}
