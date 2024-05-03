import { registerAs } from '@nestjs/config';
import process from 'process';

export default registerAs('redis', () => ({
  redis_host: process.env.REDIS_HOST,
  redis_port: process.env.REDIS_PORT,
}));
