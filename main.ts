import express from 'express';

import * as dotenv from 'dotenv';

// load env vars
dotenv.config({ path: __dirname + '/.env' });

import taskRoutes from './src/routes/task.routes';
import errorHandler from './src/utils/errorHandler';

// setup
const PORT = process.env.PORT || 3000;

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// health-check
app.get('/health-check', (req, res) => {
  res.send('ok jeff!');
});

// routes, REST - Representational State Transfer
app.use('/tasks', taskRoutes);

// error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running at Port : ${PORT}`);
});
