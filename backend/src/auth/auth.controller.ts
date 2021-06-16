import { Param } from '@nestjs/common';
import { Body, Headers, Controller, Get, HttpCode, HttpStatus, Post, Delete, Request, Res, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt.auth-guard';
import {LocalAuthGuard} from "./local.auth-guard";


interface JwtPayload {
    token: string
}

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

    @HttpCode(HttpStatus.OK)
    @Get('verify/:token')
    async verify(@Param('token')token: string) {
        return this.authService.verifyToken(token)
    }

    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtAuthGuard)
    @Delete('delete')
    async deleteUser(@Headers() req ) {
        return this.authService.DeleteAcccout(req.authorization, req.uuid);
    }

}
