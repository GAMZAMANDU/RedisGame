import express from 'express';
import roomRoutes from './routes/roomRoutes.js';
import rankRoutes from './routes/rankRoutes.js';

const app = express();
const port = 8080;

app.use(express.json());
app.use('/rank', rankRoutes);
app.use('/room', roomRoutes);

export const server = app.listen(port, () => {
  console.log(`Node.js 서버가 ${port} 포트에서 실행 중입니다.`);
});
