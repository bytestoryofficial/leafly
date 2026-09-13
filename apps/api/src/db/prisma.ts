import { PrismaPg } from '@prisma/adapter-pg';

import { PrismaClient } from '@/generated/prisma/client';

const adapter: PrismaPg = new PrismaPg({
  connectionString: process.env.DATABASE_APP_URL,
});

export const prisma = new PrismaClient({ adapter });
