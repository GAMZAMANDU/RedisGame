import express from 'express';
import {
  createRoom,
  getRoomTTL,
  getRoomInfo,
  getAllRooms
} from '../controllers/roomController.js';

const router = express.Router();

router.get('/TTL/:roomCode', getRoomTTL);
router.get('/all', getAllRooms);
router.get('/:roomCode', getRoomInfo);
router.post('/', createRoom);

export default router;