import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as qiniu from 'qiniu'
import { ConfigService } from "@nestjs/config";



async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ["log", "error", "warn", "debug", "verbose"]
  });
  await app.listen(3000);
  const configService = app.get(ConfigService);
}
bootstrap();
