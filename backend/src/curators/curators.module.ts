import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CuratorService } from './curator.service';
import { CuratorsController } from './curators.controller';
import { Curator } from './db/curator.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Curator])],
  providers: [CuratorService],
  controllers: [CuratorsController],
  exports: [CuratorService]
})
export class CuratorsModule {}
