import request from 'supertest';
import app from '../app';
import mongoose from 'mongoose';

beforeAll(async () => {
    const MONGO_URI = process.env.NODE_ENV === 'test' ? 'mongodb://test-mongodb:27017/' : process.env.MONGO_URI || '';
    await mongoose.connect(MONGO_URI);
})

afterAll(async () => {
    await mongoose.connection.collection('products').deleteMany({})
    await mongoose.connection.close();
})

describe('Product Retrieval', () => {
    let productId = '';
    it('should successfully create a product', async() => {
        const res = await request(app)
            .post('/api/products')
            .send({
                name: 'Test Product',
                price: 100,
                description: 'A test product'
            });
        expect(res.statusCode).toEqual(201);
        productId = res.body._id;
    })


    it('should fetch a product by its ID', async () => {
        const res = await request(app).get(`/api/products/${productId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('name');
    });

    it('should fetch all products', async () => {
        const res = await request(app).get('/api/products');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('should return an error for an invalid product id format', async () => {
        const res = await request(app).get('/api/products/1234');
        expect(res.statusCode).toEqual(400);
        expect(res.body).toEqual({message: 'Invalid Product ID format'});
    });

    it('should return an error for a non-existent product', async () => {
        const res = await request(app).get('/api/products/63D5E300A1B2C3D4E5F6A7B8');
        expect(res.statusCode).toEqual(404);
        expect(res.body).toEqual({message: 'Product not found'});
    });
})