import {IsNotEmpty, IsString} from 'class-validator'
import { Curator } from 'src/curators/db/curator.entity';
import { OneToMany } from 'typeorm';
export class UserDto {

    @IsString()
    @OneToMany(type => Curator, curator => curator.uuid_user)
    @OneToMany(type => Curator, curator => curator.uuid_curator)
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