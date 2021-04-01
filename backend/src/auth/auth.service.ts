import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import {hash} from 'bcrypt';
import { User } from 'src/users/db/user.entity';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByName(username);
    if (user && user.pswhash === password) {
      const { pswhash, ...result } = user;
      return result;
    }
    return null;
  }
}
