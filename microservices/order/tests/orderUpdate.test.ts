import request from 'supertest';
import app from '../app';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt, { Secret } from 'jsonwebtoken';

beforeAll(async () => {
    const MONGO_URI = process.env.NODE_ENV === 'test' ? 'mongodb://test-mongodb:27017/' : process.env.MONGO_URI || '';
    await mongoose.connect(MONGO_URI);
})

afterAll(async () => {
    await mongoose.connection.collection('products').deleteMany({})
    await mongoose.connection.collection('orders').deleteMany({})
    await mongoose.connection.collection('users').deleteMany({})
    await mongoose.connection.close();
})

describe('Order Update', () => {
    let userId: any;
    let user: any;
    let productId: any;
    let token: any;

    it('should successfully create a new user', async() => {
        const hashedPassword = await bcrypt.hash('password123', 12);


        const res = await mongoose.connection.collection('users').insertOne({
            username: 'testUser',
            email: 'test4auth@email.com',
            password: hashedPassword
        });

        userId = res.insertedId;

        user = await mongoose.connection.collection('users').findOne({
            _id: new mongoose.Types.ObjectId(userId)
        });

        const payload = {
            id: user._id,
            username: user.username
        };
    
        const JWT_SECRET: Secret = process.env.JWT_SECRET ?? '';
    
        token = jwt.sign(payload, JWT_SECRET, {
            expiresIn: '1h' // token will expire in 1 hour
        });
    })

    it('should successfully create a product', async() => {
        const res = await mongoose.connection.collection('products').insertOne({
            name: 'Test Product',
            price: 100,
            description: 'A test product'
        });

        productId = res.insertedId
    })
    
    let orderId: any;
    it('should successfully place an order', async() => {
        const res = await request(app)
            .post('/api/orders')
            .set('Authorization', `Bearer ${token}`)
            .send({
                user: user._id,
                orderItems: [{product: productId, quantity: 2}],
            });
        expect(res.statusCode).toEqual(201);

        orderId = res.body.order._id;
    })

    it('should update order status', async () => {
        const res = await request(app)
            .put(`/api/orders/${orderId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                status: 'Shipped'
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body.order.status).toBe('shipped');
    });

    it('should not update a non-existing order', async () => {
        const res = await request(app)
            .put('/api/orders/63D5E300A1B2C3D4E5F6A7B8')
            .set('Authorization', `Bearer ${token}`)
            .send({
                status: 'Shipped'
            });
        expect(res.statusCode).toEqual(404);
    });
})