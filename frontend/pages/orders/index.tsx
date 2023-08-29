import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import '../../src/app/globals.css';

interface OrderPageProps {
    orders: any[]
}

interface IOrderItems {
    product: string,
    quantity: number
}

interface IOrder {
    _id: string,
    user: string,
    orderItems: IOrderItems[],
    status: string,
    orderDate: Date,
    deliveryDate: Date
}

const OrdersPage: React.FC = ({}) => {
    const [orders, setOrders] = useState<IOrder[]>([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
    
        const fetchData = async () => {
            const res = await axios.get('http://localhost:3003/api/orders', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const orders = await res.data
            setOrders(orders)
        }
        
        fetchData();
    }, [])

    return(
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">My Orders</h1>
                {orders.length >0 &&
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        {orders.map(order => (
                            <div key={order._id} className="mb-4 border-b pb-4">
                                <h2 className="text-xl font-semibold text-gray-900 mb-2">Order #{order._id}</h2>
                                {order.orderItems.map(orderItem => (
                                    <div className="flex justify-between mb-2">
                                        <span className="text-gray-700">{orderItem.product}</span>
                                        <span className="text-blue-500">${orderItem.product}</span>
                                    </div>
                                ))}
                                <div className="mt-2">
                                    <span className="text-gray-600">Status: {order.status}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                }
                
            </div>
        </div>
    );
};

export default OrdersPage;