import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import app from './app';

dotenv.config();


const PORT = process.env.USER_SERVICE_PORT || 3001;
console.log(process.env.NODE_ENV);
const MONGO_URI = process.env.NODE_ENV === 'test' ? 'mongodb://localhost:27017/' : process.env.MONGO_URI || '';

console.log(MONGO_URI);

mongoose.connect(MONGO_URI, {family: 4}).then(() => {
    console.log('Connected to MongoDB');

    mongoose.connection.useDb('users');

    app.listen(PORT, () => {
        console.log(`User Service is running on port ${PORT}`);
    })
    
}).catch(err => {
    console.error('MongoDB connection error:', err);
})