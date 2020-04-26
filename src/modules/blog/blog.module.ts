import { Module } from '@nestjs/common';
import { HomeController } from './controller/home.controller';

@Module({
  imports: [],
  controllers: [HomeController],
  providers: [],
})
export class BlogModule {}