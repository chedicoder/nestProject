import { Controller, Get, Post, Body, Param, Put, Delete, Query, ValidationPipe, UsePipes } from '@nestjs/common';
import { TodoService } from '../services/Todo.service';
import { TodoEntity } from '../entities/TodoEntity.entity';
import { StatusEnum } from '../entities/todos.enum';
import { Add_ToDo_Dto } from '../Dto/Add_ToDo_Dto.dto';
import { UpdateTodoDto } from '../Dto/Update_ToDo_Dto.dto';

@Controller('todos')
@UsePipes(new ValidationPipe())
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  getAllTodos(): Promise<TodoEntity[]> {
    return this.todoService.getAllTodos();
  }

  @Get(':id')
  getTodoById(@Param('id') id: number): Promise<TodoEntity> {
    return this.todoService.getTodoById(id);
  }

  @Post()
  addTodo(@Body() todo: Add_ToDo_Dto): Promise<Add_ToDo_Dto> {
    return this.todoService.addTodo(todo);
  }
//PUT remplace entièrement l'entite, tandis que PATCH applique des modifications partielles à l'entite
  @Put(':id')
  updateTodo(@Param('id') id: number, @Body() todo: UpdateTodoDto): Promise<UpdateTodoDto> {
    return this.todoService.updateTodo(id, todo);
  }

  @Delete(':id')
  deleteTodo(@Param('id') id: number): Promise<void> {
    return this.todoService.deleteTodo(id);
  }

  @Delete('soft/:id')
  softDeleteTodo(@Param('id') id: number): Promise<void> {
    return this.todoService.softDeleteTodo(id);
  }

  //restorer que les entites supprime avec soft
  @Put('restore/:id')
  restoreTodo(@Param('id') id: number): Promise<void> {
    return this.todoService.restoreTodo(id);
  }

  @Get('search/:name/:description/:status')
searchTodos(
  @Param('name') name: string,
  @Param('description') description: string,
  @Param('status') status: string,
): Promise<TodoEntity[]> {
  return this.todoService.searchTodos(name, description, status);
}

//http://localhost:3000/todos/count/done
  @Get('count/:status')
  getTodoCountByStatus(@Param('status') status: StatusEnum): Promise<number> {
    return this.todoService.getTodoCountByStatus(status);
  }

//avoir les limit lignes à partir de la page page
  @Get('pagination/:page/:limit')
  getAllTodosWithPagination(@Param('page') page: number, @Param('limit') limit: number): Promise<TodoEntity[]> {
    return this.todoService.getAllTodosWithPagination(page, limit);
  }
}
