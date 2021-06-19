import {IsEmail, IsNotEmpty, IsString, Matches} from 'class-validator'
import { Curator } from 'src/curators/db/curator.entity';
import { OneToMany } from 'typeorm';
export class UserDto {

    @IsString()
    @OneToMany(type => Curator, curator => curator.uuid_user)
    @OneToMany(type => Curator, curator => curator.uuid_curator)
    uuid: string;

    @IsNotEmpty()
    @IsString()
    username: string;

    @IsString()
    role: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;


    @IsString()
    @IsNotEmpty()
    @Matches(
        /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/,
        { message: 'Weak password' },
    )
    readonly password: string;
}