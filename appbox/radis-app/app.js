const express = require('express');
const redis = require('redis');

const app = express();
const port = 3000;

// Connect to Redis
const client = redis.createClient({
    url: 'redis://redis:6379' // Redis service name in Kubernetes
});

client.connect();

app.use(express.static('.'));

// Set key-value in Redis
app.get('/set', async (req, res) => {
    const { key, value } = req.query;
    if (!key || !value) return res.send('Key and value required');
    await client.set(key, value);
    res.send(`Saved: ${key} = ${value}`);
});

// Get value from Redis
app.get('/get', async (req, res) => {
    const { key } = req.query;
    if (!key) return res.send('Key required');
    const value = await client.get(key);
    res.send(value || 'Not found');
});

app.listen(port, () => {
    console.log(`App running at http://localhost:${port}`);
});
