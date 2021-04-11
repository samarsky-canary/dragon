import {IsNotEmpty, IsString, IsUUID} from 'class-validator'
import { User } from 'src/users/db/user.entity';
import { ManyToOne } from 'typeorm';

export class CreateSchemaDto {
    name : string;
    idUser : string
    data: JSON;
    posted_by_id: string;
}