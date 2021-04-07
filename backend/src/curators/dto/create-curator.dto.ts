import {IsNotEmpty, IsString, IsUUID} from 'class-validator'
import { User } from 'src/users/db/user.entity';
import { ManyToOne } from 'typeorm';
export class CuratorDto {

    @IsNotEmpty()
    @IsUUID()
    @ManyToOne(type => User, user => user.id)
    uuid_curator: string;

    @IsNotEmpty()
    @IsUUID()
    @ManyToOne(type => User, user => user.id)
    uuid_user: string;

    @IsString()
    relation_name: string;
}