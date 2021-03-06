import { Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, ParseUUIDPipe, Post, Put, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt.auth-guard';
import { CreateSchemaDto, SchemaDto } from './dto/schema.dto';
import { SchemaService } from './schema.service';

@Controller('schema')
@UseGuards(JwtAuthGuard)
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
    async update(@Param('id') id, @Body() schema: SchemaDto) {
      return this.schemaService.update(id, schema)
    }

    @Delete('/:id')
    async delete(@Param('id') id) {
        const deleterRelation = this.schemaService.delete(id);
        if ((await deleterRelation).affected === 0) {
            throw new NotFoundException("Schema not found");
            
        }
        return deleterRelation;
    }
}
