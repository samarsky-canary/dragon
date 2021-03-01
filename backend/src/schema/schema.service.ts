import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { Schema } from './db/schema.entity';

@Injectable()
export class SchemaService {
    // constructor (
    //     @InjectRepository(Schema) 
    //     private schemaRepository: Repository<Schema>,
    //     ) {}
    
    // async findByUserId(userUuid : string) : Promise<Schema[]> {
    //     const schemes =this.schemaRepository.find({where: {uuid: userUuid}});
    //     return schemes;
    // }

    // async findBySchemaId(userUuid: string) : Promise<Schema> {
    //     const schema = this.schemaRepository.findOne(userUuid);
    //     return schema;
    // }
    
}
