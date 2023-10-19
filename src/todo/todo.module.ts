import { Module } from '@nestjs/common';
import { TodoService } from './services/Todo.service';
import { TodoController } from './controllers/Todo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoEntity } from './entities/TodoEntity.entity';


@Module({
imports: [TypeOrmModule.forFeature([TodoEntity]),],   
 providers:[TodoService],
 controllers: [TodoController]
})
export class TodoModule {}
