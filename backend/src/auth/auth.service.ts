import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import {hash, genSalt, compare} from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByName(username);

    const isCorrect = await compare(password, user.password);
    if (user && isCorrect) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
