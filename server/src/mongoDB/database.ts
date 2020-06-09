import { MongoClient, Db, FilterQuery, InsertWriteOpResult } from "mongodb";
import assert from "assert";
import { defaultItems } from "./defaultItems";

// Connection URL
const url = "mongodb://localhost:27017";

// Database Name
const dbName = "ecoletaDB";

// Create a new MongoClient
const client = new MongoClient(url, {
  poolSize: 10,
});

client.connect((err, client) => {
  const db = client.db(dbName);

  db.listCollections({ name: "items" })
    .hasNext()
    .then((collectionExists) => {
      if (!collectionExists) {
        createItemsWithDefaultValues();
      }
    });
});

const executeActionInDB = (action: any) => {
  client.connect((err, client) => {
    assert.equal(null, err);
    console.log("conectou");

    const db = client.db(dbName);

    action(db, (docs: any[]) => {
      closeDB();
    });
  });
};

export const findDocuments = (
  collectionName: string,
  callback: (docs: any[]) => void,
  filter?: FilterQuery<any>
) => {
  executeActionInDB((db: Db) => {
    const collection = db.collection(collectionName);

    collection.find({ ...filter }).toArray((err, docs) => {
      assert.equal(err, null);
      callback(docs);
    });
  });
};

export const insertDocuments = (
  collectionName: string,
  objects: any[],
  callback: (result: InsertWriteOpResult<any>) => void
) => {
  executeActionInDB((db: Db) => {
    const collection = db.collection(collectionName);

    collection.insertMany(objects, (err, result) => {
      assert.equal(null, err);
      assert.equal(objects.length, result.insertedCount);
      callback(result);
    });
  });
};

const closeDB = () => {
  client.close();
};

const createItemsWithDefaultValues = () => {
  insertDocuments("items", defaultItems, () => {
    console.log("created Items collection with default values");
  });
};
