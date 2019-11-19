require('dotenv').config();
const mongoose = require('mongoose');

let db;

module.exports = {
  async connectToDb() {
    const client = await mongoose.connect(
      process.env.MONGODB_URL, 
      { 
        useFindAndModify: false, 
        useNewUrlParser: true, 
        useUnifiedTopology: true
      }
    );
    db = client.connection.db;
  },
  async getNextSequence(name) {
    const result = await db.collection('counters').findOneAndUpdate(
      { _id: name },
      { $inc: { current: 1 } },
      { returnOriginal: false },
    );
    return result.value.current;
  }
}