import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import auth from './routes/auth';
import tweets from './routes/tweets';
import members from './routes/members';


const app = express();

app.use(cors());

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', auth)
app.use('/api/tweets', tweets);
app.use('/api/members', members);

export default app;