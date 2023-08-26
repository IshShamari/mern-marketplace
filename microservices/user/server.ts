import express from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import { Request, Response, NextFunction } from 'express';

dotenv.config();

const app = express();
const PORT = process.env.USER_SERVICE_PORT || 3001;
const MONGO_URL = process.env.MONGO_URI || '';

app.use(express.json());

/*mongoose.connect(MONGO_URL).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('MongoDB connection error:', err);
})*/

// Routes
app.use('/api/users', userRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Internal server error');
});

app.listen(PORT, () => {
    console.log(`User Service is running on port ${PORT}`);
})