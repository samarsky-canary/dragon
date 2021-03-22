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


    @Get()
    GetAllUsers() {
        return this.usersService.findAll();
    }

    @Post()
    async getUserByName(@Res() res: Response, @Body() loginData : LoginDTO) {
        const validatedUser = await this.authService.validateUser(loginData);

        console.log(loginData);
        if (!validatedUser) {
            return res.status(HttpStatus.NOT_FOUND).json("Bad authentification");
        }
        // CREATE TOKEN HERE
        const userResponse: UserDto = validatedUser;
        return res.status(HttpStatus.OK).json(validatedUser.id);
    }


    @Delete(':uuid')
    async deleteUserByID(@Res() res : Response, @Param('uuid', new ParseUUIDPipe()) uuid: string) {
        const user = await this.usersService.remove(uuid);
        return res.status(HttpStatus.OK).json('User deleted');
    }
}
