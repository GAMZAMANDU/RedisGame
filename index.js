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
    return res.status(201).json({ message: '방이 생성되었습니다.', roomCode });
  } catch (err) {
    return res.status(500).json({ error: '방 생성 실패' });
  }
});

app.get("/room/:roomCode", async(req, res) => {
  const { roomCode }  = req.params;
  const tryNumber = req.query.tryNumber
  
  try{
    const roomData = await redis.get(`room:${roomCode}`);
    if(!roomData){
      return res.status(404).json({ error: '방을 찾을 수 없습니다.' });
    }

    const roomInfo = JSON.parse(roomData)
    roomInfo.attempt += 1;
    const targetNumber = roomInfo.targetNumber

    if(targetNumber == tryNumber){
      await redis.del(`room:${roomCode}`)
      return res.status(200).json({ status : '일치하지 했습니다', roomInfo : roomInfo});
    }else{
      await redis.set(`room:${roomCode}`, JSON.stringify(roomInfo));
      return res.status(200).json({ status : '일치하지 않음', roomInfo : roomInfo});
    }
  } catch (err) {
    console.error("방 정보 조회 실패:", err);
    res.status(500).json({ error: '방 정보 조회 실패' });
  }
});

app.get("/all", async (req, res) => {
  try {
    const keys = await redis.keys('room:*');
    res.status(200).json({ keys });
  } catch (err) {
    console.error("키 조회 오류:", err);
    res.status(500).json({ error: '키 조회 실패' });
  }
});

app.listen(port, () => {
  console.log(`Node.js 서버가 ${port} 포트에서 실행 중입니다.`);
});
