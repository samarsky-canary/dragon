import {IsNotEmpty, IsString} from 'class-validator'
export class UserDto {

    @IsString()
    uuid: string;


    @IsNotEmpty()
    @IsString()
    name: string;
    
    @IsNotEmpty()
    @IsString()
    password: string;

    
    @IsString()
    role: string;
}