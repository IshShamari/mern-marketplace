import { Schema, model, Document } from 'mongoose';
import { IOrderDocument } from './interfaces';

const orderItemSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    }
});

const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true
    },
    orderItems: [orderItemSchema],
    status: {
        type: String,
        default: 'pending',
        enum: ['pending', 'shipped', 'delivered', 'cancelled']
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    deliveryDate: Date,
})

const Order = model<IOrderDocument>('Order', orderSchema);

export default Order;