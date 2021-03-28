import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import {hash} from 'bcrypt';
import { User } from 'src/users/db/user.entity';

@Injectable()
export class AuthService {
    constructor (private usersService : UsersService){}
    private saltRounds: number = 10;

    async validateUser(loginData : LoginDTO): Promise<User | undefined> {
        const user = await this.usersService.findOneByName(loginData.name);
        
        // hash(loginData.password, this.saltRounds).then(hash=>{
        //     console.log(hash);
            //if (user && user.pswhash === hash ){
            if (user && user.pswhash === loginData.password ){
                
            const {pswhash, ...result} = user;
                return user;
            }
       // });
        return undefined;
    }
}
