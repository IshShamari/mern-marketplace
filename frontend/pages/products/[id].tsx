import React from 'react';
import { useRouter } from 'next/router';
import '../../src/app/globals.css';

interface ProductPageProps {
    product: any
}

const ProductPage: React.FC<ProductPageProps> = ({product}) => {
    const router = useRouter();
    const { id } = router.query;

    if (!product) return <div>Loading...</div>;

    return (
        <div className='min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12'>
            <div className='relative py-3 sm:max-w-xl sm:mx-auto'>
                <h1 className='text-2xl font-bold text-gray-900 mb-6'>{product.name}</h1>
                <img src={product.imageUrl} alt={product.name} className='w-full h-64 object-cover mb-6 rounded' />
                <p className='text-gray-600 mb-4'>{product.description}</p>
                <span className='text-blue-500 font-semibold'>${product.price}</span>
            </div>
        </div>
    );
};

export const getServerSideProps = async (context: any) => {
    const productId = context.params.id;
    const res = await fetch(`http://localhost:3002/api/products/${productId}`);
    const product = await res.json()
    return { props: { product } };
}

export default ProductPage;