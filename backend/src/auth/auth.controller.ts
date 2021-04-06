import { Body, Controller, ForbiddenException, HttpStatus, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserDto } from 'src/users/dto/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor (private readonly authService : AuthService) {}



    @Post('signup')
    public async signup(@Res() res: Response, @Body() user : CreateUserDto) {
        const createdUser = await this.authService.signup(user);
        const {password, ...response} = createdUser;
        return res.status(HttpStatus.CREATED).json(response);
    }


    @Post('login')
    public async login(@Res() res: Response, @Body() loginData: CreateUserDto) {
        const validatedUser = await this.authService.validateUser(loginData.name, loginData.password);
        if (!validatedUser) {
            throw new ForbiddenException('Password doesnt match');
        }
        // CREATE TOKEN HERE
        const userResponse: CreateUserDto = validatedUser;
        return res.status(HttpStatus.OK).json(userResponse);
    }

}
