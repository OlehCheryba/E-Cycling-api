const redis = require('redis');

const client = redis.createClient();

client.on('connect', function() {
  console.log('Redis connected');
})

module.exports = {
  isValid(jwt) {
    return new Promise(resolve => { 
      client.get(jwt.sub, (err, data) => {
        resolve(data === undefined || data === null || data < jwt.exp * 1000);
      });
    });
  },
  revoke(userId, durationSeconds) {
    client.set(userId, Date.now() + (durationSeconds * 1000));
  }
};