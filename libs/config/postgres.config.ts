import { registerAs } from '@nestjs/config';
import * as process from 'process';

export default registerAs('postgres', () => ({
  master_host: process.env.POSTGRES_MASTER_HOST,
  master_port: Number(process.env.POSTGRES_MASTER_PORT),
  master_database: process.env.POSTGRES_MASTER_DATABASE,
  master_username: process.env.POSTGRES_MASTER_USERNAME,
  master_password: process.env.POSTGRES_MASTER_PASSWORD,
  slave_port: Number(process.env.POSTGRES_SLAVE_PORT),
  slave_database: process.env.POSTGRES_SLAVE_DATABASE,
  mode: process.env.WORK_ENV,
}));
