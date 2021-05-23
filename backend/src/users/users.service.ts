import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common"
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";
import { User } from "./db/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserDto } from "./dto/user.dto";


@Injectable()
export class UsersService {

    constructor (
    @InjectRepository(User) private usersRepository : Repository<User>,) 
    {}

    async findAll() : Promise <User[]> {
        return this.usersRepository.find();
    }

    async getUseInfo(token : string) {
    //     return await this.jwtService.verifyAsync(token, {secret: this.configService.get<string>('SECRET_KEY')})
    // .then(payload=> 
    //     this.usersRepository.findOne(payload.sub))
    //     .then(user => {
    //         return (user) 
    //         ? Promise.resolve(user)
    //         : Promise.reject("User not found")
    //     })
    // .catch(err => 
    //   Promise.reject(new UnauthorizedException("Invalid Token"))
    // );
    }




    async findOneById(id: string) : Promise<UserDto>{
        return this.usersRepository.findOne(id)
        .then(user => {
            return (user) 
            ? Promise.resolve({username: user.username, role: user.role, uuid: user.uuid})
            : Promise.reject("User not found")
        })
        .catch(err => Promise.reject(new NotFoundException(err)));
    }

    async findOneByName(username : string ) : Promise<User | undefined>  {
        return await this.usersRepository.findOne({where: {
            username: username
        }})
        .then(user => {
            return (user) 
            ? Promise.resolve(user)
            : Promise.reject("User not found")
        })
        .catch(err => Promise.reject(new NotFoundException(err)));
    }

    async create(userData : CreateUserDto) : Promise<User | undefined> {
        const user = this.usersRepository.create(userData);
        return await this.usersRepository.save(user).catch(err =>
            Promise.reject(new BadRequestException(err.toString()))
            );
    }


    async update(id: string, payload: CreateUserDto) {
        return this.usersRepository.findOne(id);
    }

    
    async delete(uuid: string) : Promise<DeleteResult> {
        return await this.usersRepository.delete(uuid);
    }
}