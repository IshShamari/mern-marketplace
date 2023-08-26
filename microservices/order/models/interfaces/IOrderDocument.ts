import { Document } from 'mongoose';
import { IOrder } from '.';

interface IOrderDocument extends IOrder, Document {};

export default IOrderDocument;