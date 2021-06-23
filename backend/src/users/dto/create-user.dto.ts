import {IsEmail, IsNotEmpty, IsString, Matches} from 'class-validator'
export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    username: string;

    @IsString()
    @IsNotEmpty()
    @Matches(
        /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/,
        { message: 'Слабый пароль' },
    )
    password: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;
}