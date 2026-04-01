import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
  console.warn('Invalid/Missing environment variable: "MONGODB_URI". Please set it in .env.local');
}

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/exceed';
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
