const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { EJSON } = require('bson');

const DB_CONNECTIONS = {
  authentication: 'mongodb+srv://goldust:goldustadmin@goldust.9lkqckv.mongodb.net/authentication',
  ProductsAndServices: 'mongodb+srv://goldust:goldustadmin@goldust.9lkqckv.mongodb.net/ProductsAndServices',
  backgroundImages: 'mongodb+srv://goldust:goldustadmin@goldust.9lkqckv.mongodb.net/backgroundImages',
  booking: 'mongodb+srv://goldust:goldustadmin@goldust.9lkqckv.mongodb.net/booking',
  cart: 'mongodb+srv://goldust:goldustadmin@goldust.9lkqckv.mongodb.net/cart',
  categories: 'mongodb+srv://goldust:goldustadmin@goldust.9lkqckv.mongodb.net/categories',
  goldustGallery: 'mongodb+srv://goldust:goldustadmin@goldust.9lkqckv.mongodb.net/goldustGallery',
  promosDatabase: 'mongodb+srv://goldust:goldustadmin@goldust.9lkqckv.mongodb.net/promosDatabase',
  reviews: 'mongodb+srv://goldust:goldustadmin@goldust.9lkqckv.mongodb.net/reviews',
  scheduleCalendar: 'mongodb+srv://goldust:goldustadmin@goldust.9lkqckv.mongodb.net/scheduleCalendar',
};

router.get('/export', async (req, res) => {
  try {
    console.log('Starting database backup export...');
    const backup = {
      exportDate: new Date().toISOString(),
      version: '1.0',
      databases: {}
    };

    for (const [dbName, connectionString] of Object.entries(DB_CONNECTIONS)) {
      console.log(`Exporting database: ${dbName}`);
      
      let connection;
      try {
        
        connection = await mongoose.createConnection(connectionString, {
          useNewUrlParser: true,
          useUnifiedTopology: true
        });

        await new Promise((resolve, reject) => {
          connection.once('open', resolve);
          connection.once('error', reject);
        });

        const collections = await connection.db.listCollections().toArray();
        backup.databases[dbName] = {};

        for (const collectionInfo of collections) {
          const collectionName = collectionInfo.name;
          console.log(`  Exporting collection: ${collectionName}`);
          
          const collection = connection.db.collection(collectionName);
          const documents = await collection.find({}).toArray();
          
          backup.databases[dbName][collectionName] = EJSON.serialize(documents);
          console.log(`    Exported ${documents.length} documents`);
        }

        await connection.close();
      } catch (error) {
        console.error(`Error exporting database ${dbName}:`, error);
        if (connection) {
          await connection.close();
        }
        backup.databases[dbName] = { error: error.message };
      }
    }

    console.log('Backup export completed successfully');

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', `attachment; filename=goldust-backup-${Date.now()}.json`);
    res.json(backup);

  } catch (error) {
    console.error('Error during backup export:', error);
    res.status(500).json({ 
      error: 'Failed to export backup',
      message: error.message 
    });
  }
});

router.post('/restore', async (req, res) => {
  try {
    console.log('Starting database restore...');
    const backup = req.body;

    if (!backup.databases || typeof backup.databases !== 'object') {
      return res.status(400).json({ 
        error: 'Invalid backup format',
        message: 'Backup must contain a databases object' 
      });
    }

    const results = {
      restoreDate: new Date().toISOString(),
      backupDate: backup.exportDate,
      databases: {}
    };

    for (const [dbName, collections] of Object.entries(backup.databases)) {
      console.log(`Restoring database: ${dbName}`);
      
      if (!DB_CONNECTIONS[dbName]) {
        console.warn(`  Skipping unknown database: ${dbName}`);
        results.databases[dbName] = { 
          status: 'skipped',
          message: 'Database not in current configuration' 
        };
        continue;
      }

      if (collections.error) {
        results.databases[dbName] = { 
          status: 'skipped',
          message: `Original export had error: ${collections.error}` 
        };
        continue;
      }

      let connection;
      try {
        
        connection = await mongoose.createConnection(DB_CONNECTIONS[dbName], {
          useNewUrlParser: true,
          useUnifiedTopology: true
        });

        await new Promise((resolve, reject) => {
          connection.once('open', resolve);
          connection.once('error', reject);
        });

        results.databases[dbName] = { collections: {} };

        for (const [collectionName, documents] of Object.entries(collections)) {
          console.log(`  Restoring collection: ${collectionName}`);
          
          try {
            const collection = connection.db.collection(collectionName);
            
            const deserializedDocs = EJSON.deserialize(documents);
            
            await collection.deleteMany({});
            
            if (Array.isArray(deserializedDocs) && deserializedDocs.length > 0) {
              await collection.insertMany(deserializedDocs);
              results.databases[dbName].collections[collectionName] = {
                status: 'success',
                documentsRestored: deserializedDocs.length
              };
              console.log(`    Restored ${deserializedDocs.length} documents`);
            } else {
              results.databases[dbName].collections[collectionName] = {
                status: 'success',
                documentsRestored: 0
              };
              console.log(`    Collection was empty`);
            }
          } catch (error) {
            console.error(`    Error restoring collection ${collectionName}:`, error);
            results.databases[dbName].collections[collectionName] = {
              status: 'error',
              message: error.message
            };
          }
        }

        results.databases[dbName].status = 'success';
        await connection.close();

      } catch (error) {
        console.error(`Error restoring database ${dbName}:`, error);
        if (connection) {
          await connection.close();
        }
        results.databases[dbName].status = 'error';
        results.databases[dbName].message = error.message;
      }
    }

    console.log('Database restore completed');
    res.json(results);

  } catch (error) {
    console.error('Error during backup restore:', error);
    res.status(500).json({ 
      error: 'Failed to restore backup',
      message: error.message 
    });
  }
});

module.exports = router;
