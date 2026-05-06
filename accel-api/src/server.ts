import express from 'express';
import morgan from 'morgan'

import { config } from './config/config';
import passport from './config/passport'
import errorHandler from './middleware/errorHandler';
import apiRouter from './routes/routes';

const app = express();
const PORT = config.PORT;

app.use(express.json());

app.use(passport.initialize())

app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

app.use('/api', apiRouter);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`>>>>>>>>> Server is running on port ${PORT} >>>>>>>>>`);
});