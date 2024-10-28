import express from "express"; 
import Redis from 'ioredis';
import { v4 as uuidv4 } from 'uuid';
import { randomNumber } from "./modules/randomNumber.js";

const app = express();
const port = 8080;
const redis = new Redis();
app.use(express.json());

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
    targetNumber: randomNumber(),
    attempt : 0
  };

  try {
    await redis.set(`room:${roomCode}`, JSON.stringify(roomInfo));
    res.json({ message: '방이 생성되었습니다.', roomCode: roomCode });
  } catch (err) {
    return res.status(500).json({ error: '방 생성 실패' });
  }
});

app.get("/room/:roomCode", async(req, res) => {
  const { roomCode }  = req.params;
  redis.get(`room:${roomCode}`, (err, values) => {
    if(err){
      return res.status(400).json({ error : '키 조회 실패'});
    } else {
      const roomInfo = JSON.parse(values)
      const targetNumber = roomInfo.targetNumber
      roomInfo.attempt += 1;
      redis.set(`room:${roomCode}`, JSON.stringify(roomInfo));
      // console.log(values, typeof(values));
      return res.status(200).json({ status : '연결 성공', roomInfo : roomInfo});
    }
  })
})

app.get("/all", (req, res) => {
  redis.keys('*', (err, keys) => {
    if (err) {
      console.error('키 조회 오류:', err);
      return res.status(500).json({ error: '키 조회 실패' });
    } else {
      return res.json({ keys });
    }
  });
});

app.listen(port, () => {
  console.log(`Node.js 서버가 ${port} 포트에서 실행 중입니다.`);
});
