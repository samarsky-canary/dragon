import { forwardRef, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserRole } from 'src/users/enum';
import { User } from 'src/users/db/user.entity';
import { v4 as uuidv4 } from 'uuid'
import { IViewUser } from "../users/interfaces/user.interface";
import { JwtService } from '@nestjs/jwt';
import { CryptoService } from './bcrypt.service';
import { ConfigService } from '@nestjs/config';
import { ForgotPasswordDTO } from './dto/forgotPassword.dto';
import { ChangePasswordDto } from './dto/changePassword.dto';
@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private cryptoService: CryptoService,
    private readonly configService: ConfigService,
  ) { }


  async signUp(user: CreateUserDto): Promise<any> {
    const newUser = new User();
    newUser.username = user.username;
    newUser.email = user.email;
    newUser.password = await this.cryptoService.hashPassword(user.password);
    newUser.role = UserRole.USER;
    return this.userService.create(newUser)
      .then(user => {
        return this.createToken(user);
      });
  }



  async logIn(username: string, password: string): Promise<IViewUser | undefined> {
    return await this.userService.findOneByName(username)
      .then(async user => {
        return await this.cryptoService.checkPassword(password, user.password)
          ? Promise.resolve(user)
          : Promise.reject(new UnauthorizedException("Invalid password"))
      })
  }


  async createToken(user) {
    const payload = { username: user.username, sub: user.uuid };
    return {
      access_token: this.jwtService.sign(payload),
      username: user.username,
      uuid: user.uuid,
      role: user.role,
      email: user.email
    }
  }

  async verifyToken(token) {
    return await this.jwtService.verifyAsync(token, { secret: this.configService.get<string>('SECRET_KEY') })
      .then(payload => Promise.resolve({ username: payload.username, uuid: payload.sub }))
      .catch(err =>
        Promise.reject(new UnauthorizedException("Invalid Token"))
      );
  }

  async verify(payload) {
    return await this.userService.findOneById(payload.sub)
      .then(signedUser => Promise.resolve(signedUser))
      .catch(err => Promise.reject(new UnauthorizedException("Invalid Authorization")))
  }


  async DeleteAcccout(payload: string, user: string) {
    const token = payload.replace('Bearer ', '');
    let yourself = false;
    return Promise.resolve(this.jwtService.decode(token))
      .then(token => {
        yourself = token.sub === user;
        this.userService.findByIds([token.sub, user])
          .then(users => {
            if (!yourself) {
              const who = users.find(value => value.uuid === token.sub);
              const whom = users.find(value => value.uuid === user);
              if (!whom.role)
                return Promise.reject(new NotFoundException("Пользователя не существует"));
              if (who.role !== 'ADMIN')
                return Promise.reject(new NotFoundException("Вы не администратор"));
              if (whom.role === 'ADMIN')
                return Promise.reject(new NotFoundException("Админа может удалить только суперадмин"));
            }
            return this.userService.remove(user);
          })
      }).catch((err: Error) => {
        Promise.reject(new UnauthorizedException(err.message))
      })
  }
  
  async changePassword(changePasswordDto: ChangePasswordDto): Promise<boolean> {
    const password = await this.cryptoService.hashPassword(changePasswordDto.newPassword);
    const user = await this.userService.findOneByName(changePasswordDto.username);
    await this.userService.updatePassword(user.uuid, { password });
    return true;
}

  async ForgotPassword(payload: ForgotPasswordDTO) {
    const user = this.userService.findOneByEmail(payload.email);
  }
}
