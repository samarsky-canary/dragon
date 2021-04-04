import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { hash, genSalt, compare } from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserRole } from 'src/users/enum';
import { User } from 'src/users/db/user.entity';
import {v4 as uuidv4} from 'uuid'
@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  static salt = 10;

  async signup(user : CreateUserDto) : Promise<User> {
    const newUser = new User();
    newUser.name = user.name;
    newUser.password  = await hash(user.password, AuthService.salt);
    newUser.id = uuidv4();
    newUser.role = UserRole.USER;
    return this.usersService.create(newUser);
  }



  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByName(username);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isCorrect = await compare(password, user.password);
    if (user && isCorrect) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
