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



    delete(id: string) {
        return this.schemaRepository.delete(id);
    }

    
    update(id: any, schema: CreateSchemaDto) {
        return this.schemaRepository.save(schema).then(schema=>{
            if (schema) return schema;
                throw new NotFoundException("schema not found");
        });
    }    
}
