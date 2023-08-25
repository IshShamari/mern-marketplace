import { Document } from 'mongoose';
import { IUser } from '.';

interface IUserDocument extends IUser, Document {}

export default IUserDocument;