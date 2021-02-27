import {Controller, Get, Post, Param, Body, ParseUUIDPipe, Delete} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./interfaces/user.interface";
import { UsersService } from "./users.service";


@Controller('users') 
export class UsersController
{

    // injected service in constructor
    constructor (private usersService : UsersService) {}
    @Get()
    async findAll() :Promise<User[]> {
        return this.usersService.findAll();
    }

    @Get(':uuid')
    getUserById(@Param('uuid', new ParseUUIDPipe()) uuid : string) {
        return this.usersService.findByUuid(uuid);
    }

    @Delete(':uuid')
    deleteUserByID(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
        return this.usersService.remove(uuid);
    }
}
