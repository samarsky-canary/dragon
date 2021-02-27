import { Injectable } from "@nestjs/common"
import {User} from "./interfaces/user.interface";


@Injectable()
export class UsersService {
    private readonly users: User[] =[];

    public create(user : User) {
        this.users.push(user);
    }

    public findAll() : User[] {
        return this.users;
    }

    public findByUuid(uuid : string) : User {
        // no null check ALARM
        return this.users.find(user => user.uuid === uuid);
    }
}