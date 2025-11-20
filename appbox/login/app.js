const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const redis = require('redis');


const REDIS_HOST = process.env.REDIS_HOST || 'redis-service';
const REDIS_PORT = process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379;


const client = redis.createClient({ url: `redis://${REDIS_HOST}:${REDIS_PORT}` });


client.on('error', (err) => console.error('Redis Client Error', err));


(async () => {
await client.connect();
console.log('Connected to Redis at', REDIS_HOST + ':' + REDIS_PORT);
})();


const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));


app.post('/submit', async (req, res) => {
const { name, email } = req.body;
if (!name || !email) return res.status(400).json({ message: 'name and email required' });


try {
const key = `user:${email}`;
await client.hSet(key, { name, email, createdAt: new Date().toISOString() });
// Optionally set TTL
// await client.expire(key, 60*60*24);
return res.json({ message: 'Saved to Redis', key });
} catch (err) {
console.error(err);
return res.status(500).json({ message: 'Redis error', error: err.message });
}
});


app.get('/user/:email', async (req, res) => {
const email = req.params.email;
try {
const key = `user:${email}`;
const data = await client.hGetAll(key);
if (Object.keys(data).length === 0) return res.status(404).json({ message: 'Not found' });
return res.json(data);
} catch (err) {
console.error(err);
return res.status(500).json({ message: 'Redis error', error: err.message });
}
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('App listening on', PORT));
