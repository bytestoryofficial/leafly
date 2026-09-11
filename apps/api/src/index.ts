import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { Db } from 'mongodb';

import getDb from '@/db/client';

import Plant from '@/db/schemas/plant.schema';

const app = new Hono();

app.use('*', logger());

app.get('/health', (context) => context.json({ status: 'OK' }));

app.get('/plants', async (context) => {
  const db: Db = await getDb();
  const plants = await db.collection('plant_species').find().toArray();

  return context.json(plants);
});

export default app;
