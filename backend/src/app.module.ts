import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm'
import { UsersModule } from './users/users.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import {ServeStaticModule} from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth/auth.controller';
import { CuratorsModule } from './curators/curators.module';
import { SchemaModule } from './schema/schema.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({rootPath: join(__dirname, "..", "..", "client-react", "build"), exclude: ["/api*"]}),
    //ServeStaticModule.forRoot({renderPath: '/sample', rootPath: join(__dirname, "..", "..", "client", "dist"), exclude: ["/api*"]}),
    
    TypeOrmModule.forRoot({autoLoadEntities: true}),
    UsersModule,
    AuthModule,
    CuratorsModule,
    SchemaModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(AuthController);
  }
}
