import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { hash, compare } from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserRole } from 'src/users/enum';
import { User } from 'src/users/db/user.entity';
import {v4 as uuidv4} from 'uuid'
import {IViewUser} from "../users/interfaces/user.interface";
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService : JwtService,
    )
    {}

  static salt = 10;

  async signup(user : CreateUserDto) : Promise<User> {
    const newUser = new User();
    newUser.username = user.username;
    newUser.password  = await hash(user.password, AuthService.salt);
    newUser.uuid = uuidv4();
    newUser.role = UserRole.USER;
    return this.usersService.create(newUser);
  }



  async validateUser(username: string, password: string): Promise<IViewUser | undefined> {
    const user = await this.usersService.findOneByName(username);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (await compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return undefined;
  }


  async login(user: any) {
    const payload = {username: user.username, sub: user.userId};
    return {
      access_token: this.jwtService.sign(payload),
      role: user.role
    }
  }
}
