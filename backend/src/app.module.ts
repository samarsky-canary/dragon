import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm'
import {User} from './users/user.entity';
import { UserModule } from './users/users.module';
import { UserController } from './users/users.controller';
import { UsersService } from './users/users.service';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      name: 'drakon',
      type:'postgres',
      host:'localhost',
      port: 5432,
      username:'postgres',
      password: '223322',
      database: 'drakon_db',
      entities: [User],
      synchronize: true,
      logging: false,
    }),
  ],
  controllers: [AppController, UserController],
  providers: [AppService, UsersService],
})
export class AppModule {}
