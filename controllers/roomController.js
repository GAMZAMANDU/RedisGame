import { v4 as uuidv4 } from 'uuid';
import redis from '../config/redis.js';
import { randomNumber } from '../modules/randomNumber.js';

export const createRoom = async (req, res) => {
  const roomCode = uuidv4();
  const roomInfo = {
    roomCode,
    createdAt: new Date().toISOString(),
    targetNumber: randomNumber(),
    attempt: 0,
  };

  try {
    await redis.set(`room:${roomCode}`, JSON.stringify(roomInfo));
    await redis.expire(`room:${roomCode}`, 300);
    return res.status(201).json({ message: '방이 생성되었습니다.', roomCode });
  } catch (err) {
    console.error('방 생성 실패:', err);
    return res.status(500).json({ error: '방 생성 실패' });
  }
};

export const getRoomTTL = async (req, res) => {
  const { roomCode } = req.params;

  try {
    const ttl = await redis.ttl(`room:${roomCode}`);
    if (ttl === -2) {
      return res.status(404).json({ error: '해당 방이 존재하지 않습니다.' });
    }
    return res.status(200).json({ ttl });
  } catch (error) {
    console.error('TTL 조회 실패:', error);
    return res.status(500).json({ error: 'TTL 조회 실패' });
  }
};

export const getRoomInfo = async (req, res) => {
  const { roomCode } = req.params;
  const tryNumber = req.query.tryNumber;

  try {
    const roomData = await redis.get(`room:${roomCode}`);
    if (!roomData) {
      return res.status(404).json({ error: '방을 찾을 수 없습니다.' });
    }

    const roomInfo = JSON.parse(roomData);
    roomInfo.attempt += 1;

    if (roomInfo.targetNumber == tryNumber) {
      await redis.del(`room:${roomCode}`);
      return res.status(200).json({ status: '일치했습니다', roomInfo });
    } else {
      await redis.set(`room:${roomCode}`, JSON.stringify(roomInfo));
      return res.status(200).json({ status: '일치하지 않음', roomInfo });
    }
  } catch (err) {
    console.error("방 정보 조회 실패:", err);
    res.status(500).json({ error: '방 정보 조회 실패' });
  }
};

export const getAllRooms = async (req, res) => {
  try {
    const keys = await redis.keys('room:*');
    res.status(200).json({ rooms: keys });
  } catch (err) {
    console.error("키 조회 오류:", err);
    res.status(500).json({ error: '키 조회 실패' });
  }
};
