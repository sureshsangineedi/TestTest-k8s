const express = require('express');
const redis = require('redis');
const app = express();
app.use(express.json());

const client = redis.createClient({
  socket: { host: process.env.REDIS_HOST || 'redis', port: 6379 }
});
client.connect();

app.post('/save', async (req, res) => {
  const { name, email } = req.body;
  await client.hSet('users', name, email);
  res.json({status:"saved"});
});

app.get('/list', async (req, res) => {
  const data = await client.hGetAll('users');
  res.json(data);
});

app.listen(3000, () => console.log("Backend running on 3000"));
