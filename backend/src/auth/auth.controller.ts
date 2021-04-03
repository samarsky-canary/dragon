import { Body, Controller, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserDto } from 'src/users/dto/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor (private readonly authService : AuthService) {}

    @Post('login')
    public async login(@Res() res: Response, @Body() loginData: UserDto) {
        const validatedUser = await this.authService.validateUser(loginData.name, loginData.password);
        if (!validatedUser) {
            return res.status(HttpStatus.NOT_FOUND).json("User not found");
        }
        // CREATE TOKEN HERE
        const userResponse: CreateUserDto = validatedUser;
        return res.status(HttpStatus.OK).json(userResponse);
    }

}
