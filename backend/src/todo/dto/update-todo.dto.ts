import { IsString, IsOptional, IsBoolean, IsEnum } from 'class-validator';
import { TodoPriority } from '../todo.entity';

export class UpdateTodoDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  completed?: boolean;

  @IsEnum(TodoPriority)
  @IsOptional()
  priority?: TodoPriority;
}
