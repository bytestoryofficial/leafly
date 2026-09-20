import Redis from 'ioredis';

export const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASSWORD,
});

redis.on('error', (error: Error) => {
  console.log('[redis] connection error: ', error);
});
