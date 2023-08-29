import request from 'supertest';
import app from '../app';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

beforeAll(async () => {
    const MONGO_URI = process.env.NODE_ENV === 'test' ? 'mongodb://test-mongodb:27017/' : process.env.MONGO_URI || '';
    await mongoose.connect(MONGO_URI);

    const hashedPassword = await bcrypt.hash('password123', 12);

    await mongoose.connection.collection('users').insertOne({
        username: 'testUser',
        email: 'test4auth@email.com',
        password: hashedPassword
    });
});

afterAll(async () => {
    await mongoose.connection.collection('users').deleteMany({})
    await mongoose.connection.close();
});

describe('User Authentication', () => {
    it('should authenticate a user successfully', async () => {
        const res = await request(app)
            .post('/api/users/login')
            .send({
                email: 'test4auth@email.com',
                password: 'password123',
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
    });

    it('should not authenticate with invalid credentials', async () => {
        // Provide incorrect password
        const res = await request(app)
            .post('/api/users/login')
            .send({
                email: 'test4auth@email.com',
                password: 'wrongPassword'
            });
        expect(res.statusCode).toEqual(401);
        expect(res.body).toEqual({message: 'Unauthorized'});
    });

    it('should not authenticate with non existant email', async () => {
        const res = await request(app)
            .post('/api/users/login')
            .send({
                email: 'nonExisting@email.com',
                password: 'password123'
            });
        expect(res.statusCode).toEqual(404);
        expect(res.body).toEqual({message: 'User does not exist'});
    });
});