import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import app from './app';

dotenv.config();


const PORT = process.env.ORDER_SERVICE_PORT || 3003;
const MONGO_URI = process.env.NODE_ENV === 'test' ? 'mongodb://test-mongodb:27017/' : process.env.MONGO_URI || '';

mongoose.connect(MONGO_URI, {family: 4}).then(() => {
    console.log('Connected to MongoDB');

    app.listen(PORT, () => {
        console.log(`Order Service is running on port ${PORT}`);
    })
}).catch(err => {
    console.error('MongoDB connection error:', err);
})