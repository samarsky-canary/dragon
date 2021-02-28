import {Controller, Get, Post, Param, Body, ParseUUIDPipe, Delete, NotFoundException, Res, HttpStatus} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./interfaces/user.interface";
import { UsersService } from "./users.service";
import {Response} from 'express'

@Controller('users') 
export class UsersController
{

    // injected service in constructor
    constructor (private usersService : UsersService) {}
    @Get()
    async findAll(@Res() res : Response) {
        const users = await this.usersService.findAll();
        return res.status(HttpStatus.OK).json(users);
    }

    @Get(':uuid')
    getUserById(@Res() res : Response, @Param('uuid', new ParseUUIDPipe()) uuid : string) {
        const user = this.usersService.findByUuid(uuid);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return res.status(HttpStatus.OK).json(user);
    }

    @Delete(':uuid')
    async deleteUserByID(@Res() res : Response, @Param('uuid', new ParseUUIDPipe()) uuid: string) {
        const user = await this.usersService.remove(uuid);
        return res.status(HttpStatus.OK).json('User deleted');
    }
}
