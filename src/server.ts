// server.ts → Configuração principal do servidor.

import express from 'express';
import { router } from './routes/authRoutes'

const app = express();

app.use(express.json());

app.use(router);

app.listen(process.env.PORT || 3333, () => {
  console.log('Server is running on port http://localhost:3333');
});