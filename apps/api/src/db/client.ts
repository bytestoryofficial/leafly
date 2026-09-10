import { Db, MongoClient } from 'mongodb';

const url: string | undefined = process.env.MONGODB_URI;

if (!url) throw new Error('CLIENT MONGO DB ERROR: MONGODB_URI is not set');

const client: MongoClient = new MongoClient(url);

/* Lazy-initialization */
let connected: boolean = false;

const getDb = async (): Promise<Db> => {
  if (!connected) {
    await client.connect();
    connected = true;
  }

  return client.db();
};

export default getDb;
