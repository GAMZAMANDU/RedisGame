import express from 'express';
import {
  createRoom,
  getRoomTTL,
  getRoomInfo,
  getAllRooms
} from '../controllers/roomController.js';

const router = express.Router();

router.post('/', createRoom);
router.get('/TTL/:roomCode', getRoomTTL);
router.get('/all', getAllRooms);
router.get('/:roomCode', getRoomInfo);

export default router;
