import {Controller, Get, Post, Param, Body, ParseUUIDPipe, Delete, NotFoundException, Res, HttpStatus, UseGuards} from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt.auth-guard";
import { UsersService } from "./users.service";

@Controller('users') 
export class UsersController
{
    // injected service in constructor
    constructor (private usersService : UsersService) {}

    @Get('/:id')
    async findOneById(@Param('id') id): Promise<any> {
        return this.usersService.findOneById(id);
    }

    @UseGuards(JwtAuthGuard)
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
