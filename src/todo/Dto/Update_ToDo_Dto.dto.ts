import { Add_ToDo_Dto } from "./Add_ToDo_Dto.dto";
import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsOptional } from 'class-validator';
import { StatusEnum } from "../entities/todos.enum";

export class UpdateTodoDto extends PartialType (Add_ToDo_Dto){
    @IsOptional()
    @IsEnum(StatusEnum, { message: 'Le statut doit être une valeur valide parmi les StatusEnum' })
    status: StatusEnum;
}