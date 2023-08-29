import express from 'express';
import * as dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import { Request, Response, NextFunction } from 'express';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Internal server error');
});

export default app;