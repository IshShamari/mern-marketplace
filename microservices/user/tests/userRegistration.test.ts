import request from 'supertest';
import app from '../app';
import mongoose from 'mongoose';

beforeAll(async () => {
    const MONGO_URI = process.env.NODE_ENV === 'test' ? 'mongodb://localhost:27017' : process.env.MONGO_URI || '';
    await mongoose.connect(MONGO_URI);
});

afterAll(async () => {
    await mongoose.connection.collection('users').deleteMany({})
    await mongoose.connection.close();
    
});

describe('User Registration', () => {
    it('should register a new user successfully', async () => {
        const res = await request(app)
            .post('/api/users/register')
            .send({
                username: 'testUser',
                email: 'test@email.com',
                password: 'password123',
                confirmPassword: 'password123'
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('token');
    });

    it('should not register with an existing email', async () => {
        // Provide an already existing email
        const res = await request(app)
            .post('/api/users/register')
            .send({
                username: 'testUser',
                email: 'test@email.com',
                password: 'password123',
                confirmPassword: 'password123'
            });
        expect(res.statusCode).toEqual(409);
        expect(res.body).toEqual({message: 'User already exists'});
    });

    it('should not register with invalid data', async () => {
        // Provide invalid data
        const res = await request(app)
            .post('/api/users/register')
            .send({
                email: 'test2@email.com',
                password: 'password123',
                confirmPassword: 'password123', 
                // missing username
            });
        expect(res.statusCode).toEqual(400);
        expect(res.body).toEqual({message: 'Invalid request'});
    });

    it('should not register with mismatched passwords', async () => {
        // Provide mismatched passwords
        const res = await request(app)
            .post('/api/users/register')
            .send({
                username: 'testUser',
                email: 'test3@email.com',
                password: 'password123',
                confirmPassword: 'PASSWORD123',
            });
        expect(res.statusCode).toEqual(400);
        expect(res.body).toEqual({message: 'Passwords do not match'});
    });
});