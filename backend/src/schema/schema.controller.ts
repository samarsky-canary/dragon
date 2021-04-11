import { Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, ParseUUIDPipe, Post, Put, Res } from '@nestjs/common';
import { Response } from 'express';
import { CreateSchemaDto } from './dto/schema.dto';
import { SchemaService } from './schema.service';

@Controller('schema')
export class SchemaController {
    constructor (private schemaService : SchemaService){}
    

    @Get()
    async getAll() {
        return this.schemaService.findAll();
    }
    @Get('/:id')
    async getOneById(@Param('id', ParseUUIDPipe) id : string) {
        return this.schemaService.findOneById(id);
    }
    @Get('/user/:id')
    async getAllByUserId(@Param('id', ParseUUIDPipe) id : string) {
        return this.schemaService.findAllByUserId(id);
    }

    @Post('create')
    async createRelations(@Body() schema: CreateSchemaDto) {
        return this.schemaService.create(schema);
    }

    @HttpCode(201)
    @Put('/:id')
    async update(@Param('id') id, @Body() schema: CreateSchemaDto) {
      return this.schemaService.update(id, schema)
    }

    @Delete('/:id')
    async delete(@Param() id: number) {
        return this.schemaService.delete(id);
    }
}
