import { Schema, model, Document } from 'mongoose';
import { IProductDocument } from './interfaces';

const productSchema = new Schema({
    name: {type: String, required: true},
    description: String,
    price: {type: Number, required: true},
    stock: Number,
    imageUrl: String,
});

const Product = model<IProductDocument>('Product', productSchema);

export default Product;