import { BadRequestException, Injectable } from "@nestjs/common";
import { compare, hash } from "bcrypt";


@Injectable()
export class CryptoService {

    private saltRounds = 10;
    public async hashPassword(password: string) {
        return await hash(password, this.saltRounds)
        .catch(err => {
            throw new BadRequestException(err.message);
        });
    }


    public async checkPassword(candidate: string, saltedPassword: string) : Promise<boolean> {
        return compare(candidate, saltedPassword)
        .catch(err => {
            throw new BadRequestException(err.message);
        });
    }
}