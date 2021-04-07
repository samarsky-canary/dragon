import { Body, Controller, HttpStatus, Post, Request, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import {LocalAuthGuard} from "./local.auth-guard";

@Controller('auth')
export class AuthController {
    constructor (private readonly authService : AuthService) {}


    @Post('signup')
    public async signup(@Res() res: Response, @Body() user : CreateUserDto) {
        const createdUser = await this.authService.signup(user);
        const {password, ...response} = createdUser;
        return res.status(HttpStatus.CREATED).json(response);
    }


    // @Post('login')
    // public async login(@Res() res: Response, @Body() loginData: CreateUserDto) {
    //     const validatedUser = await this.authService.validateUser(loginData.username, loginData.password);
    //     if (!validatedUser) {
    //         throw new ForbiddenException('Password doesnt match');
    //     }
    //     // CREATE TOKEN HERE
    //     return res.status(HttpStatus.OK).json(validatedUser);
    // }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

}
