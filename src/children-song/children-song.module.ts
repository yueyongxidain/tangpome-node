import { Module } from '@nestjs/common';
import { ChildrenSongController } from './children-song.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import {ChildrenSong} from './children-song.entity'

@Module({
  imports: [TypeOrmModule.forFeature([ChildrenSong])],
  controllers: [ChildrenSongController],
  exports: [TypeOrmModule]
})
export class ChildrenSongModule {}
