import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";
import { User } from "./db/user.entity";


@Injectable()
export class UsersService {

    constructor (
    @InjectRepository(User) private usersRepository : Repository<User>,) 
    {}

    async findAll() : Promise<User[]> {
        const users = this.usersRepository.find();
        return users;
    }

    async findOneByName(username : string ) : Promise<User | undefined>  {
        return this.usersRepository.findOne({ name : username});
    }


    async createUser(userData : LoginDTO) : Promise<User | undefined> {
        var user = new User();
        user.name = userData.userName;
        user.pswhash = userData.password;
        return this.usersRepository.create()
    }

    async remove(uuid: string) : Promise<DeleteResult> {
        const deletedUser = await this.usersRepository.delete(uuid);
        return deletedUser;
    }
}