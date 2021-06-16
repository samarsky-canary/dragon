import {Controller, Get, Post, Param, Body, ParseUUIDPipe, Delete, NotFoundException, Res, HttpStatus, UseGuards, ValidationPipe, Put, Headers} from "@nestjs/common";
import { identity } from "rxjs";
import { JwtAuthGuard } from "src/auth/jwt.auth-guard";
import { LocalAuthGuard } from "src/auth/local.auth-guard";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserDto } from "./dto/user.dto";
import { UsersService } from "./users.service";

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController
{
    // injected service in constructor
    constructor (private usersService : UsersService) {}


    @Get('nonpriveleged')
    async getAllNonPrivelegd() : Promise<UserDto[]> {
        const users = await this.usersService.findAllNonPrivelegedUsers();
        return users.map(user=>{
            delete user.password;
            return user;
        })
    }


    @Get('/:id')
    async findOneById(@Param('id', new ParseUUIDPipe({version: '4'})) id: string): Promise<any> {
        return this.usersService.findOneById(id);
    }




    @Put("/update")
    async update(@Body() payload:UserDto){
        return this.usersService.update(payload);
    }


    @Get()
    async GetLoggedUserInfo(): Promise<any> {
        return this.usersService.findAll();
    }

    @Delete('/:id')
    async deleteUserByID(@Param('id', new ParseUUIDPipe({version: '4'})) id: string) {
        return this.usersService.delete(id);
    }
}
