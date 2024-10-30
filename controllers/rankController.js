import redis from "../config/redis.js";

export const getRank = async (req, res) => {
  const keys = await redis.zrange("leaderboard",0,-1);
  const leaderboard = keys.map((data, index) => ({ rank: index + 1, roomCode: data }));

  return res.status(200).json({"leaderboard" : leaderboard})
}