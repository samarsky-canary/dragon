import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm'
import { UsersModule } from './users/users.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { UsersController } from './users/users.controller';
import { SchemaModule } from './schema/schema.module';
import {ServeStaticModule} from '@nestjs/serve-static';
import { join } from 'path';


@Module({
  imports: [
    ServeStaticModule.forRoot({rootPath: join(__dirname, "..", "..", "client-react", "build"), exclude: ["/api*"]}),
    TypeOrmModule.forRoot(),
    UsersModule,
    SchemaModule ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(UsersController);
  }
}
