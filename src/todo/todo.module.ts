import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TodoService } from './services/Todo.service';
import { TodoController } from './controllers/Todo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoEntity } from './entities/TodoEntity.entity';
import { Add_ToDo_Dto } from './Dto/Add_ToDo_Dto.dto';
import { UpdateTodoDto } from './Dto/Update_ToDo_Dto.dto';
import { authMiddleware } from './Security/auth.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([TodoEntity])],   
  providers: [TodoService, Add_ToDo_Dto, UpdateTodoDto],
  controllers: [TodoController]
})
export class TodoModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(authMiddleware)
      .forRoutes('todos');
  }
}
