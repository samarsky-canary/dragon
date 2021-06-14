import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Res, UseGuards, ValidationPipe } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt.auth-guard';
import { CuratorService } from './curator.service';
import { CuratorDto } from './dto/create-curator.dto';


//@UseGuards(JwtAuthGuard)
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

    @Get('relations/:id')
    async getCuratorRelations(@Param('id') id : number) : Promise<CuratorDto[]> {
        return this.curatorService.findStudents(id);
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
