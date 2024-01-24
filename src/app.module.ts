
import { DatabaseModule } from "./infra/database/database.module";
import { UserModule } from "./application/users/user.module";
import { ConfigModule } from "@nestjs/config";
import { Module } from '@nestjs/common';
import { CategoryModule } from "./application/categories/category.module";
import { PostModule } from "./application/posts/post.module";
import { CacheModule } from "@nestjs/cache-manager";
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
    }),
    DatabaseModule,
    UserModule,
    CategoryModule,
    PostModule
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}

