import redis from "../config/redis.js";

export const getRank = async (req, res) => {
  const keys = await redis.zrange("leaderboard",0,-1);
  console.log(keys);
  // const leaderboard = keys.map((data, index) => ({ rank: index + 1, roomCode: data.roomCode, attempt : data.attempt}));
  const leaderboard = keys.map((data, index) => {
    data = JSON.parse(data)
    return ({ rank: index + 1, roomCode: data.roomCode, attempt : data.attempt})
  });
  return res.status(200).json({"leaderboard" : leaderboard})
}