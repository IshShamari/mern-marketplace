import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import app from './app';

dotenv.config();

const PORT = process.env.PRODUCT_SERVICE_PORT || 3002;
const MONGO_URI = process.env.NODE_ENV === 'test' ? 'mongodb://localhost:27017/' : process.env.MONGO_URI || '';


mongoose.connect(MONGO_URI, {family: 4}).then(() => {
    console.log('Connected to MongoDB');

    app.listen(PORT, () => {
        console.log(`Product Service is running on port ${PORT}`);
    })
}).catch(err => {
    console.error('MongoDB connection error:', err);
})