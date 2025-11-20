const express = require("express");
const redis = require("redis");
const path = require("path");

const app = express();
app.use(express.static(path.join(__dirname)));
app.use(express.json());

const REDIS_HOST = process.env.REDIS_HOST || "redis-service";
const REDIS_PORT = process.env.REDIS_PORT || 6379;

const client = redis.createClient({
  socket: {
    host: REDIS_HOST,
    port: REDIS_PORT,
  },
});

client.connect().then(() => console.log("Connected to Redis"));

app.get("/count", async (req, res) => {
  let count = await client.get("count");
  if (!count) count = 0;
  res.json({ count: parseInt(count) });
});

app.post("/increment", async (req, res) => {
  let count = await client.incr("count");
  res.json({ count });
});

app.listen(3000, () => {
  console.log("Idea app running on port 3000");
});
