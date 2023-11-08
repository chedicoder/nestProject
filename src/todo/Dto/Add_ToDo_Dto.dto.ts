import {   IsString, MinLength, MaxLength, IsNotEmpty, ValidationArguments } from 'class-validator';
import { validationMessages } from './messages_validation';
export class Add_ToDo_Dto {
 
  @IsString({ message: validationMessages.isString })
  @MinLength(3, { message: validationMessages.minLength(3) })
  @MaxLength(10, { message: validationMessages.maxLength(10) }) 
  name: string;

  @IsNotEmpty({ message: validationMessages.required })
  @IsString({ message: validationMessages.isString })
  @MinLength(10, { message: validationMessages.minLength(10) })
  description: string;

  
}


