import {IsNotEmpty, IsString, IsUUID} from 'class-validator'
export class CuratorDto {

    @IsNotEmpty()
    @IsUUID()
    uuid_curator: string;

    @IsNotEmpty()
    @IsUUID()
    uuid_user: string;

    @IsString()
    relation_name: string;
}