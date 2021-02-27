import {Controller, Get, Post, Param, Body} from "@nestjs/common";
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
    getUserById(@Param() params) {
        return this.usersService.findByUuid(params.uuid);
    }

    @Post()
    create(@Body() createUserDto :CreateUserDto) {
        return this.usersService.create(createUserDto);
    }
}
