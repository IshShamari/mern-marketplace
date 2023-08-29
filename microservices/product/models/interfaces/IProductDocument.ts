import { Document } from 'mongoose';
import { IProduct } from '@shamariishmael/shared';

interface IProductDocument extends IProduct, Document {}

export default IProductDocument;