import { Body, Controller, HttpCode, HttpStatus, Post, Request, Res, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import {LocalAuthGuard} from "./local.auth-guard";

@Controller('auth')
export class AuthController {
    constructor (private readonly authService : AuthService) {}


    @HttpCode(HttpStatus.CREATED)
    @Post('signup')
    public async signup(@Body() user : CreateUserDto) {
        const createdUser = await this.authService.signUp(user);
        const {password, ...response} = createdUser;
        return response;
    }

    @HttpCode(HttpStatus.OK)
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return this.authService.createToken(req.user);
    }

}
