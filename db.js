const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const dbName = 'rewell';

let db;

async function connectToDB() {
  const client = new MongoClient(uri, { useUnifiedTopology: true });
  await client.connect();
  console.log('✅ Connected to MongoDB');
  db = client.db(dbName);
}

function getCollection(name) {
  if (!db) throw new Error('❌ Database not connected');
  return db.collection(name);
}

module.exports = { connectToDB, getCollection };
