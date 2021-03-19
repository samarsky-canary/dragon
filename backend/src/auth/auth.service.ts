import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor (private usersService : UsersService){}
    private saltRounds: number = 10;

    async validateUser(loginData : LoginDTO): Promise<any> {
        const user = await this.usersService.findOneByName(loginData.userName);

        console.log(user.pswhash);
        bcrypt.hash(loginData.password, this.saltRounds).then(hash=>{
            if (user && user.pswhash === hash ){
                const {pswhash, ...result} = user;
                return result;
            }
        });
        return null;
    }
}
