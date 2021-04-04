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

    async findAll() : Promise <User[]> {
        return this.usersRepository.find();
    }

    async findOneById(id: string) : Promise<User | undefined> {
        return await this.usersRepository.findOne(id)
        .then(user => {
            return (user) 
            ? user
            : undefined
        });
    }

    async findOneByName(username : string ) : Promise<User | undefined>  {        
        return await this.usersRepository.findOne({where: {
            name: username
        }})
        .then(user => {
            return (user) 
            ? user
            : undefined
        });
    }

    async create(userData : CreateUserDto) : Promise<User | undefined> {
        const user = this.usersRepository.create(userData);
        return await this.usersRepository.save(user).catch(err =>
            Promise.reject(new BadRequestException(err.toString()))
            );
    }

    
    async remove(uuid: string) : Promise<DeleteResult> {
        const deletedUser = await this.usersRepository.delete(uuid);
        return deletedUser;
    }
}