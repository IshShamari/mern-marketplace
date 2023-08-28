import request from 'supertest';
import app from '../app';
import mongoose from 'mongoose';

beforeAll(async () => {
    const MONGO_URI = 'mongodb://localhost:27017'
    await mongoose.connect(MONGO_URI);
})

afterAll(async () => {
    await mongoose.connection.collection('products').deleteMany({})
    await mongoose.connection.close();
})

describe('Product Creation', () => {
    it('should successfully create a product', async() => {
        const res = await request(app)
            .post('/api/products')
            .send({
                name: 'Test Product',
                price: 100,
                description: 'A test product'
            });
        expect(res.statusCode).toEqual(201);
    })

    it('should not create a product with missing data', async() => {
        const res = await request(app)
            .post('/api/products')
            .send({
                name: '',
                price: 0,
                description: 'A test product'
            });
        expect(res.statusCode).toEqual(400);
        expect(res.body).toEqual({message: 'Invalid request'})
    })
})