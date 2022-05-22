const redis = require('redis')
const client = redis.createClient({
    port: 6379,
    host: '127.0.0.1',
    legacyMode: true
})

// client.ping((err, pong) => {
//     console.log(pong)
// })

client.on('connect', () => {
    console.log('Connected Redis')
})
client.on('error', (error) => {
    console.log(error)
})
client.on('ready', () => {
    console.log('Redis to ready')
})
client.on('end', () => {
    console.log('Redis end')
})

module.exports = client

// const { createClient } = require('redis');

// (async () => {
//   const client = createClient({
//     legacyMode: true
//   });

//   client.on('error', (err) => console.log('Redis Client Error', err));
//   client.on('connect', () => console.log('Redis Client Connected'));

//   await client.connect();

//   await client.set('key', 'value');
//   const value = await client.get('key');
// })();
