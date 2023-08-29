import React from 'react';
import Link from 'next/link';
import axios from 'axios';
import '../../src/app/globals.css';

interface HomePageProps {
    products: any[]
}

const HomePage: React.FC<HomePageProps> = ({products}) => {
    return(
        <div className="min-h-screen bg-gray-200 flex items-center justify-center">
            <div className="w-full max-w-4xl">
                <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">Marketplace Products</h1>
                
                <div className="flex flex-wrap justify-center gap-4">
                    {products.map(product => (
                        <div key={product._id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200 ease-in">
                            <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover rounded-t-lg" />

                            <div className="p-4">
                                <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                                <p className="text-gray-700 truncate">{product.description}</p>
                                <div className="mt-4 flex justify-between items-center">
                                    <span className="text-blue-500 font-semibold">${product.price}</span>
                                    <Link href={`/products/${product._id}`}>
                                        <div className="text-white bg-indigo-500 px-4 py-2 rounded hover:bg-indigo-600 transition-colors duration-200 ease-in">
                                            View Details
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export const getServerSideProps = async () => {
    const res = await axios.get('http://localhost:3002/api/products')
    const products = res.data;
    return { props: { products } };
}

export default HomePage;