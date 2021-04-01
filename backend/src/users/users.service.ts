import { BadRequestException, Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";
import { User } from "./db/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";


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
        if (username === undefined) {
            throw new BadRequestException("username is undefinied");
        }
        
        const user = await this.usersRepository.findOne({where: {
            name: username
        }});
        console.log(user.name);
        return user;
    }

    async create(userData : CreateUserDto) : Promise<User | undefined> {
        var user = new User();
        user.name = userData.name;
        user.pswhash = userData.password;
        return this.usersRepository.create(user);
    }

    
    async remove(uuid: string) : Promise<DeleteResult> {
        const deletedUser = await this.usersRepository.delete(uuid);
        return deletedUser;
    }
}