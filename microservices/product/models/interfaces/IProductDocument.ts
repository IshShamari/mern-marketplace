import { Document } from 'mongoose';
import { IProduct } from '.';

interface IProductDocument extends IProduct, Document {}

export default IProductDocument;