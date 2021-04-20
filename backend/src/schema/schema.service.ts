import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Schema } from './db/schema.entity';
import { CreateSchemaDto } from './dto/schema.dto';

@Injectable()
export class SchemaService {
    constructor(
        @InjectRepository(Schema) private schemaRepository : Repository<Schema>
    ) {}


    findAll() {
        return this.schemaRepository.find();
    }


    async findOneById(id: string) {
        return await this.schemaRepository.findOne(id).then(
            schema => {
                if (schema) return schema;
                throw new NotFoundException("schema not found");
            }  
        )
    }

    create(schema: CreateSchemaDto) {
        return this.schemaRepository.save(schema);
    }

    async findAllByUserId(user_id: string) {
        return await this.schemaRepository.find({
            where: {idUser: user_id}
        }).then(schemas => {
            return Promise.resolve(schemas);    
        })
    }



    delete(id: number) {
        throw new Error('Method not implemented.');
    }
    update(id: any, schema: CreateSchemaDto) {
        throw new Error('Method not implemented.');
    }





    
    // async findByUserId(userUuid : string) : Promise<Schema[]> {
    //     const schemes =this.schemaRepository.find({where: {uuid: userUuid}});
    //     return schemes;
    // }

    // async findBySchemaId(userUuid: string) : Promise<Schema> {
    //     const schema = this.schemaRepository.findOne(userUuid);
    //     return schema;
    // }
    
}
