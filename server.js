require('dotenv').config();
const { connectToDb } = require('./db');

const app = require('./app');

const port = process.env.port || 80;

(async () => {
  try {
    await connectToDb();
    await app.listen(port);
    console.log(`API server is working on port ${port}`);
  } catch (err) {
    console.log(err)
  }
})();