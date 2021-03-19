import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";



@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor (private authService : AuthService) {
        // in super there configuration options for passport
        super();
    }

    async validate(loginData: LoginDTO) : Promise<any> {
        const user = await this.authService.validateUser(loginData);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}