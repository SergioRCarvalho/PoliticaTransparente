import { MongoClient } from 'mongodb';

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentiatlly
 * during API Route usage.
 * https://github.com/vercel/next.js/pull/17666
 */
global.mongo = global.mongo || {};

let indexesCreated = false;
async function createIndexes(db) {
  await Promise.all([
    db
      .collection('tokens')
      .createIndex({ expireAt: -1 }, { expireAfterSeconds: 0 }),
    db
      .collection('posts')
      .createIndexes([{ key: { createdAt: -1 } }, { key: { creatorId: -1 } }]),
    db
      .collection('comments')
      .createIndexes([{ key: { createdAt: -1 } }, { key: { postId: -1 } }]),
    db.collection('users').createIndexes([
      { key: { email: 1 }, unique: true },
      { key: { username: 1 }, unique: true },
    ]),
  ]);
  indexesCreated = true;
}

export async function getMongoClient() {
  if (!global.mongo.client) {
    global.mongo.client = new MongoClient(process.env.MONGODB_URI);
  }
  await global.mongo.client.connect();
  return global.mongo.client;
}

export default async function database(req, res, next) {
  if (!global.mongo.client) {
    global.mongo.client = new MongoClient(process.env.MONGODB_URI);
  }
  req.dbClient = await getMongoClient();
  req.db = req.dbClient.db();
  if (!indexesCreated) await createIndexes(req.db);
  return next();
}
