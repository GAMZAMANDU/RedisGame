import express from 'express';
import roomRoutes from './routes/roomRoutes.js';

const app = express();
const port = 8080;

app.use(express.json());
app.use('/room', roomRoutes);

app.listen(port, () => {
  console.log(`Node.js 서버가 ${port} 포트에서 실행 중입니다.`);
});
