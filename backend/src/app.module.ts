import { Module } from '@nestjs/common';
import { TodoModule } from './todo/todo.module';
import { TagModule } from './tag/tag.module';

@Module({
  imports: [TodoModule, TagModule],
})
export class AppModule {}
