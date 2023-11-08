import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoEntity } from '../entities/TodoEntity.entity';
import { StatusEnum } from '../entities/todos.enum';
import { Add_ToDo_Dto } from '../Dto/Add_ToDo_Dto.dto';
import { UpdateTodoDto } from '../Dto/Update_ToDo_Dto.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private  todoRepository: Repository<TodoEntity>,
  ) {}

  async addTodo(todo: Add_ToDo_Dto): Promise<Add_ToDo_Dto> {
    return this.todoRepository.save(todo);
  }

  async updateTodo(id: number, todo: UpdateTodoDto): Promise<UpdateTodoDto> {
    const todoToUpdate = await this.todoRepository.findOne({ where: { id } });
    if (!todoToUpdate) {
      throw new NotFoundException(`Le todo d'id ${id} n'existe pas.`);
    }
    const updatedTodo = Object.assign(todoToUpdate, todo);
    return this.todoRepository.save(updatedTodo);
  }

  async deleteTodo(id: number): Promise<void> {
    await this.todoRepository.delete(id);
  }

  async softDeleteTodo(id: number): Promise<void> {
    await this.todoRepository.softDelete(id);//entite desactive mais reste dans le table de la bd
  }

  async restoreTodo(id: number): Promise<void> {
    await this.todoRepository.restore(id);
  }

  async getAllTodos(): Promise<TodoEntity[]> {
    return this.todoRepository.find();
  }

  async getTodoById(id: number): Promise<TodoEntity> {
    const todo = await this.todoRepository.findOne({ where: { id } });
    if (!todo) {
      throw new NotFoundException(`Le todo d'id ${id} n'existe pas.`);
    }
    return todo;
  }

  async searchTodos(name?: string, description?: string, status?: string): Promise<TodoEntity[]> {
    const query = this.todoRepository.createQueryBuilder('todo');
    if (name) {
      query.andWhere('todo.name LIKE :name', { name: `%${name}%` });
    }
    if (description) {
      query.andWhere('todo.description LIKE :description', { description: `%${description}%` });
    }
    if (status) {
      query.andWhere('todo.status = :status', { status });
    }
    return query.getMany();
}


  async getTodoCountByStatus(status: StatusEnum): Promise<number> {
    return this.todoRepository.count({ where: { status } });
  }

  async getAllTodosWithPagination(page: number, limit: number): Promise<TodoEntity[]> {
    return this.todoRepository.find({
      take: limit,
      skip: (page - 1) * limit,
    });
  }
}
