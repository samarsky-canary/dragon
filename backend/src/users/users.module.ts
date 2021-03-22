import {Module} from '@nestjs/common'
import {TypeOrmModule} from "@nestjs/typeorm"
import { AuthService } from 'src/auth/auth.service'
import { User } from './db/user.entity'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UsersService, AuthService],
    controllers: [UsersController],
    exports: [UsersService]
})
export class UsersModule{};