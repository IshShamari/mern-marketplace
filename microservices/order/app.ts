import express from 'express';
import * as dotenv from 'dotenv';
import orderRoutes from './routes/orderRoutes';
import { Request, Response, NextFunction } from 'express';

dotenv.config();

const app = express();

app.use(express.json());


// Routes
app.use('/api/orders', orderRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Internal server error');
});

export default app;