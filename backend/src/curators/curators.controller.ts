import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Res, ValidationPipe } from '@nestjs/common';
import { Response } from 'express';
import { CuratorService } from './curator.service';
import { CuratorDto } from './dto/create-curator.dto';

@Controller('curators')
export class CuratorsController {

    constructor(private readonly curatorService: CuratorService) {}

    @Get()
    async getAll() {
        return this.curatorService.findAll();
    }
    @Get('/:id')
    async getOneById(@Param('id') id : number) {
        return this.curatorService.findOneById(id);
    }

    @Post('create')
    async createRelations(@Body() curatorObject: CuratorDto) {
        return this.curatorService.create(curatorObject);
    }

    @HttpCode(201)
    @Put('/:id')
    async update(@Param('id') id, @Body() payload:CuratorDto) {
      return this.curatorService.update(id, payload)
    }

    @Delete('/:id')
    async removeRelation(@Param() relationId: number) {
        return this.curatorService.delete(relationId);
    }
}
