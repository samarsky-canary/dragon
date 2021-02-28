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

    async findByUuid(uuid : string) : Promise<User> {
        return this.usersRepository.findOne(uuid);
    }

    async remove(uuid: string) : Promise<DeleteResult> {
        const deletedUser = await this.usersRepository.delete(uuid);
        return deletedUser;
    }
}