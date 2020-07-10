import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();

// routers
import expenseRouter from './routes/expense';
import incomeRouter from './routes/income';
import authRouter from './routes/auth';

// data
import { init } from './db';

const PORT = process.env.PORT || 5000;
const app = express();
app.use(bodyParser.json());

// routes
app.use('/api/expense', expenseRouter);
app.use('/api/income', incomeRouter);
app.use('/api/', authRouter);

app.get('/', (req, res) => {
  res.send(`Listening on localhost:${PORT}`);
});

init().then(() => {
  // first init db then start api
  app.listen(process.env.PORT || 5000, () =>
    console.log(`Listening on localhost:${PORT}`)
  );
});
