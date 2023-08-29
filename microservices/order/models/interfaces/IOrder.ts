import { IUser } from '@shamariishmael/shared';
import { IOrderItem } from '.';
import { Status } from '../enums';

interface IOrder {
    user: IUser,
    orderItems: [IOrderItem],
    status: Status,
    orderDate: Date,
    deliveryDate: Date,
}

export default IOrder;