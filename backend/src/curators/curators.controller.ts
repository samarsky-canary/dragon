import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, Res, UseGuards, ValidationPipe } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt.auth-guard';
import { CuratorService } from './curator.service';
import { CreateCuratorDto } from './dto/create-curator.dto';
import { CuratorDto } from './dto/curatorDTO';


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
    async getByCuratorId(@Param('id', new ParseUUIDPipe({version: '4'})) id: string) : Promise<CreateCuratorDto[]> {
        return this.curatorService.findStudents(id);
    }


    @Post('create')
    async createRelations(@Body() curatorObject: CreateCuratorDto) {
        return this.curatorService.create(curatorObject);
    }

    @Put()
    async update(@Body() payload: CuratorDto) {
      return this.curatorService.update(payload);
    }

    // @Delete('relation/:id')
    // async removeRelationByUser(@Body() payload:CuratorDto) {
    //     return this.curatorService.deletebyUserId(user_id);
    // }

    @Delete('/:id')
    async removeRelation(@Param() relationId: number) {
        return this.curatorService.delete(relationId);
    }


}
