import { IProduct } from '../../../product/models/interfaces';
interface IOrderItem {
    product: IProduct,
    quantity: number
}

export default IOrderItem;