import { IsOptional, IsString, MinLength, MaxLength, IsIn, IsNotEmpty } from 'class-validator';
import { StatusEnum } from '../entities/todos.enum'; 
import { validationMessages } from './messages_validation';
export class UpdateTodoDto {
  @IsNotEmpty({ message: validationMessages.required })
  @IsString({ message: validationMessages.isString })
  @MinLength(3, { message: validationMessages.minLength(3) })
  @MaxLength(10, { message: validationMessages.maxLength(10) })
  @IsOptional()
  name: string;

  @IsNotEmpty({ message: validationMessages.required })
  @IsString({ message: validationMessages.isString })
  @MinLength(10, { message: validationMessages.minLength(10) })
  @IsOptional()
  description: string;

  @IsOptional()
  @IsIn(Object.values(StatusEnum), { message: 'Le statut doit être une valeur valide parmi les StatusEnum' })
  status: StatusEnum;
}


