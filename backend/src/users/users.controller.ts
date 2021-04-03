import {Controller, Get, Post, Param, Body, ParseUUIDPipe, Delete, NotFoundException, Res, HttpStatus} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";
import {Response} from 'express'
import { AuthService } from "src/auth/auth.service";

@Controller('users') 
export class UsersController
{
    // injected service in constructor
    constructor (private usersService : UsersService, private authService: AuthService) {}

    @Get('/:id')
    async findOneById(@Param('id') id): Promise<any> {
        return this.usersService.findOneById(id);
    }

    @Get()
    async findAll(): Promise<any> {
        return this.usersService.findAll();
    }

    
    // @Delete(':uuid')
    // async deleteUserByID(@Res() res : Response, @Param('uuid', new ParseUUIDPipe()) uuid: string) {
    //     const user = await this.usersService.remove(uuid);
    //     return res.status(HttpStatus.OK).json('User deleted');
    // }
}
