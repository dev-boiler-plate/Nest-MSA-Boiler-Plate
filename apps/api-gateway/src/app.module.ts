import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import postgresConfig from '../../../libs/config/postgres.config';
import swaggerConfig from '../../../libs/config/swagger.config';
import { DatabaseModule } from '@app/database';
import { LoggerMiddleware } from '@app/middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [postgresConfig, swaggerConfig],
    }),
    DatabaseModule,
  ],
  providers: [Logger],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
