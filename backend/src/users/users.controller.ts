import {Controller, Get, Post, Param, Body, ParseUUIDPipe, Delete, NotFoundException, Res, HttpStatus} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";
import {Response} from 'express'

@Controller('users') 
export class UsersController
{
    // injected service in constructor
    constructor (private usersService : UsersService) {}


    @Get()
    GetAllUsers() {
        return this.usersService.findAll();
    }

    @Post()
    getUserByName(@Res() res: Response, @Body() loginData : LoginDTO) {
        const response = this.usersService.findOneByName(loginData.userName);
        console.log(loginData);
        if (!response) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR);
        } 
        response.then(user => {
            if (!user) {
                return res.status(HttpStatus.NOT_FOUND).json("hello");
            }
            if (user.pswhash !== loginData.password) {
                return res.status(HttpStatus.UNAUTHORIZED);
            }
            // CREATE TOKEN HERE
            return res.status(HttpStatus.OK).json(response);
        });
    }


    @Delete(':uuid')
    async deleteUserByID(@Res() res : Response, @Param('uuid', new ParseUUIDPipe()) uuid: string) {
        const user = await this.usersService.remove(uuid);
        return res.status(HttpStatus.OK).json('User deleted');
    }
}
