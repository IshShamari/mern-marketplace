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

describe('Product Update', () => {
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

    it('should update product details', async () => {
        const res = await request(app)
            .put(`/api/products/${productId}`)
            .send({
                name: 'Updated Product Name'
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body.product.name).toBe('Updated Product Name');
    });

    it('should return an error for an invalid product id format', async () => {
        const res = await request(app)
            .put('/api/products/1234')
            .send({
                name: 'New Name'
            });
        expect(res.statusCode).toEqual(400);
        expect(res.body).toEqual({message: 'Invalid Product ID format'});
    });

    it('should not update a non-existing product', async () => {
        const res = await request(app)
            .put('/api/products/63D5E300A1B2C3D4E5F6A7B8')
            .send({
                name: 'New Name'
            });
        expect(res.statusCode).toEqual(404);
        expect(res.body).toEqual({message: 'Product does not exist'});;
    });
});