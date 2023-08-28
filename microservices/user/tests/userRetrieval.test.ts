import request from 'supertest';
import app from '../app';
import mongoose from 'mongoose';

let token: any;

beforeAll(async () => {
    const MONGO_URI = process.env.NODE_ENV === 'test' ? 'mongodb://localhost:27017' : process.env.MONGO_URI || '';
    await mongoose.connect(MONGO_URI);

    
    
    const res = await request(app)
        .post('/api/users/login')
        .send({
            username: 'testUser',
            email: 'test@email.com',
            password: 'password123',
            confirmPassword: 'password123'
        });
    process.env.token = res.body.token
});

afterAll(async () => {
    await mongoose.connection.collection('users').deleteMany({})
    await mongoose.connection.close();
});

describe('User Retrieval', () => {
    let token: any;

    it('should register a user', async () => {
        const res = await request(app)
        .post('/api/users/register')
        .send({
            username: 'testUser',
            email: 'test@email.com',
            password: 'password123',
            confirmPassword: 'password123'
        });
        expect(res.statusCode).toEqual(201);
    })

    it('should log in a user', async () => {
        const res = await request(app)
        .post('/api/users/login')
        .send({
            email: 'test@email.com',
            password: 'password123',
        });
        expect(res.statusCode).toEqual(200);

        token = res.body.token
    })

    it('should fetch a user by token header', async () => {
      const res = await request(app).get(`/api/users/me`).set('Authorization', `Bearer ${token}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('username');
    });

    it('should not fetch a user with non-existent id', async () => {
        await mongoose.connection.collection('users').deleteMany({})
        
        const res = await request(app).get(`/api/users/me`).set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(404);
        expect(res.body).toEqual({message: 'User does not exist'});
    });
  });