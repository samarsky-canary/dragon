import {IsNotEmpty, IsString} from 'class-validator'
export class CreateUserDto {
    name: string;
    password: string;
    role: string;
}