const express = require("express");
const app = express();
const port = 8080;
const bodyParser = require('body-parser');
const Redis = require('ioredis');
const { v4: uuidv4 } = require('uuid');

const redis = new Redis();

app.use(bodyParser.json());

redis.on('error', (err) => {
  console.error('Redis error: ', err);
});

app.get("/", (req, res) => {
  res.send("Hello");
});

app.post("/room", async (req, res) => {
  const roomCode = uuidv4();

  const roomInfo = {
    roomCode: roomCode,
    createdAt: new Date().toISOString(),
  };

  try {
    await redis.set(`room:${roomCode}`, JSON.stringify(roomInfo));
    res.json({ message: '방이 생성되었습니다.', roomCode: roomCode });
  } catch (err) {
    return res.status(500).json({ error: '방 생성 실패' });
  }
});

app.listen(port, () => {
  console.log(`Node.js 서버가 ${port} 포트에서 실행 중입니다.`);
});
