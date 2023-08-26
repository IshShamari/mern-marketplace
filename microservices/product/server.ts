import express from 'express';
import * as dotenv from 'dotenv';
import productRoutes from './routes/productRoutes';
import { Request, Response, NextFunction } from 'express';

dotenv.config();

const app = express();
const PORT = process.env.PRODUCT_SERVICE_PORT || 3002;
const MONGO_URL = process.env.MONGO_URI || '';

app.use(express.json());

/*mongoose.connect(MONGO_URL).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('MongoDB connection error:', err);
})*/

// Routes
app.use('/api/products', productRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Internal server error');
});

app.listen(PORT, () => {
    console.log(`Product Service is running on port ${PORT}`);
})