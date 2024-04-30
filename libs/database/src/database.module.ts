import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        let obj: TypeOrmModuleOptions = {
          type: 'postgres',
          autoLoadEntities: true,
          synchronize: false,
          logging: configService.get('STAGE') === 'local',
          replication: {
            master: {
              host: configService.get('postgres.master_host'),
              port: configService.get<number>('postgres.master_port'),
              database: configService.get('postgres.master_database'),
              username: configService.get('postgres.master_username'),
              password: configService.get('postgres.master_password'),
            },
            slaves: [
              {
                host: configService.get('postgres.master_host'),
                port: configService.get<number>('postgres.slave_port'),
                database: configService.get('postgres.slave_database'),
                username: configService.get('postgres.master_username'),
                password: configService.get('postgres.master_password'),
              },
            ],
          },
        };
        // 주의! local 환경에서만 개발 편의성을 위해 활용
        if (configService.get('mode') === 'local') {
          obj = Object.assign(obj, {
            logging: true,
            synchronize: true,
          });
        }
        return obj;
      },
    }),
  ],
  providers: [],
  exports: [],
})
export class DatabaseModule {}
