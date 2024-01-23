import { Injectable, LogLevel, Logger, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { Prisma, PrismaClient } from "@prisma/client";
import { PrismaClientOptions } from "@prisma/client/runtime/library";

@Injectable()
export class PrismaService
  extends PrismaClient<PrismaClientOptions, LogLevel>
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    super({
      log:
        process.env.NODE_ENV === "development"
          ? [
              {
                emit: "event",
                level: "query",
              },
              {
                emit: "event",
                level: "error",
              },
              {
                emit: "event",
                level: "info",
              },
              {
                emit: "event",
                level: "warn",
              },
            ]
          : undefined,
    });
  }

  async onModuleInit() {
    if (process.env.NODE_ENV === "development") {
      this.$on("error", event => {
        this.logger.error(event);
      });
      this.$on("warn", event => {
        this.logger.warn(event);
      });
      this.$on("info", event => {
        this.logger.verbose(event);
      });
      this.$on("query", event => {
        this.logger.log(event);
      });
    }
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}