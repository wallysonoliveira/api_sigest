import express from 'express';
import dotenv from 'dotenv';
import { router as icmsIpmRouter } from './routes/icms_ipm_route';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Funcionando!');
});

app.use('/auth', authRouter);
app.use('/api', icmsIpmRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
