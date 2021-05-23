import { forwardRef, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserRole } from 'src/users/enum';
import { User } from 'src/users/db/user.entity';
import {v4 as uuidv4} from 'uuid'
import {IViewUser} from "../users/interfaces/user.interface";
import { JwtService } from '@nestjs/jwt';
import { CryptoService } from './bcrypt.service';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService : JwtService,
    private cryptoService: CryptoService,
    private readonly configService: ConfigService, 
    )
    {}


  async signUp(user : CreateUserDto) : Promise<any> {
    const newUser = new User();
    newUser.username = user.username;
    newUser.password  = await this.cryptoService.hashPassword(user.password);
    newUser.role = UserRole.USER;
    return this.usersService.create(newUser)
    .then(user => {
      return this.createToken(user);
    });
  }



  async logIn(username: string, password: string): Promise<IViewUser | undefined> {
    return await this.usersService.findOneByName(username)
    .then(async user => {
      return await this.cryptoService.checkPassword(password, user.password) 
      ? Promise.resolve(user)
      : Promise.reject(new UnauthorizedException("Invalid password"))
    })
  }


  async createToken(user) {
    const payload = {username: user.username, sub: user.uuid};
    return {
      access_token: this.jwtService.sign(payload),
      username: user.username,
      uuid: user.uuid,
      role: user.role,
    }
  }

  async verifyToken(token) {
    return await this.jwtService.verifyAsync(token, {secret: this.configService.get<string>('SECRET_KEY')})
    .then(payload=>Promise.resolve({username: payload.username, uuid: payload.sub}))
    .catch(err => 
      Promise.reject(new UnauthorizedException("Invalid Token"))
    );
  }

  async verify(payload) {
    return await this.usersService.findOneById(payload.sub)
    .then(signedUser => Promise.resolve(signedUser))
    .catch(err => Promise.reject(new UnauthorizedException("Invalid Authorization")))
  }
}
