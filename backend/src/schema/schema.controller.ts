import { Controller, Get, HttpStatus, NotFoundException, Param, ParseUUIDPipe, Res } from '@nestjs/common';
import { Response } from 'express';
import { SchemaService } from './schema.service';

@Controller('schema')
export class SchemaController {
    // constructor (private schemaService : SchemaService){}
    
    // @Get(':uuid')
    // async findByUserId(@Res() res: Response, @Param('uuid', new ParseUUIDPipe()) uuid: string) {
    //     const schema = this.schemaService.findByUserId(uuid);
    //     if (!schema) {
    //         throw new NotFoundException("User not found");
    //     }
    //     return res.status(HttpStatus.OK).json(schema);
    // }
}
