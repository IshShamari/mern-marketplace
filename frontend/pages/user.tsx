import React from 'react';
import Link from 'next/link';

interface UserPageProps {
    user: any,
    orders: any[]
}

const UserPage: React.FC<UserPageProps> = ({user, orders}) => {
    return(
        <div>
            <h1>Welcome, {user.name}</h1>
            <h2>Your Orders</h2>
            <ul>
                {orders.map(order => (
                    <li key={order.id}>
                        {order.productName} - ${order.totalPrice}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export const getServerSideProps = async (context: any) => {
    const res = await fetch('http://localhost:3003/api/orders');
    const orders = await res.json()
    return { props: { orders } };
}

export default UserPage;