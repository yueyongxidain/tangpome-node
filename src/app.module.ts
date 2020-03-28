import { resolve, join } from "path";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { ChildrenSongModule } from './children-song/children-song.module';
const conf = require(resolve(__dirname, "../config/conf.js"));
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [() => conf],
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      ...conf.mysql,
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
      synchronize: false // should not be true!
    }),
    ChildrenSongModule
  ]
})
export class AppModule {}
