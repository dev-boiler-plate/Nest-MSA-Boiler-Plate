import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

@Injectable()
export class DatabaseService {
  constructor(private readonly configService: ConfigService) {}

  // * 단일 지점 사용을 위해서
  getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get('postgres.host'),
      port: this.configService.get<number>('postgres.port'),
      database: this.configService.get('postgres.database'),
      username: this.configService.get('postgres.username'),
      password: this.configService.get('postgres.password'),
      autoLoadEntities: true,
      synchronize: false,
      logging: this.configService.get('STAGE') === 'local',
    };
  }
}
