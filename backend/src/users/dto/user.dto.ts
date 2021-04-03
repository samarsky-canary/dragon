import {IsNotEmpty, IsString} from 'class-validator'
export class UserDto {
    name: string;
    password: string;
}