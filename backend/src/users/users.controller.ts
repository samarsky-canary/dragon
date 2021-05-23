import {Controller, Get, Post, Param, Body, ParseUUIDPipe, Delete, NotFoundException, Res, HttpStatus, UseGuards, ValidationPipe, Put, Headers} from "@nestjs/common";
import { identity } from "rxjs";
import { JwtAuthGuard } from "src/auth/jwt.auth-guard";
import { LocalAuthGuard } from "src/auth/local.auth-guard";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController
{
    // injected service in constructor
    constructor (private usersService : UsersService) {}

    @Get('/:id')
    async findOneById(@Param('id', ParseUUIDPipe) id: string): Promise<any> {
        return this.usersService.findOneById(id);
    }

    @Put("/:id")
    async update(@Param('id', ParseUUIDPipe) id: string, @Body() payload:CreateUserDto){
        return this.usersService.update(id, payload);
    }


    @Get()
    async GetLoggedUserInfo(@Headers('Authorization') token: string): Promise<any> {
        const parsedToken = token.split(' ')[1];
        return this.usersService.findAll();
    }

    @Delete('/:id')
    async deleteUserByID(@Param('id', new ParseUUIDPipe()) id: string) {
        return this.usersService.delete(id);
    }
}
