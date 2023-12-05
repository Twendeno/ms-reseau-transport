import { Module } from "@nestjs/common";
import { CoordinateModule } from "./coordinate/coordinate.module";
import { PrismaModule } from "./prisma/prisma.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), CoordinateModule, PrismaModule],
  controllers: [],
  providers: []
})
export class AppModule {
}
