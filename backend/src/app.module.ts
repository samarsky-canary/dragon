import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm'
import {User} from './users/db/user.entity';
import { UsersModule } from './users/users.module';


@Module({
  imports: [
    UsersModule,
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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
