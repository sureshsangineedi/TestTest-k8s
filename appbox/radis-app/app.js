const express = require('express');
const { createClient } = require('redis');

const app = express();
const port = 3000;

const client = createClient({
    url: 'redis://redis:6379'
});

client.connect().catch(console.error);

app.use(express.static('.'));

// Set key-value
app.get('/set', async (req, res) => {
    const { key, value } = req.query;
    if (!key || !value) return res.send('Key and value required');
    await client.set(key, value);
    res.send(`Saved: ${key} = ${value}`);
});

// Get value
app.get('/get', async (req, res) => {
    const { key } = req.query;
    if (!key) return res.send('Key required');
    const val = await client.get(key);
    res.send(val || "Not found");
});

app.listen(port, () => console.log(`Running on ${port}`));
