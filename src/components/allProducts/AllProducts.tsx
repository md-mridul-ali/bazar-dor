import React from 'react';
import ProductCard from './ProductCard';
import { IProduct } from '@/types/productsTypes';

const getAllProducts = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
  );
  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }
  return res.json();
};

const AllProducts = async() => {

    const products = await getAllProducts();
    // const {nameBn } = products;

    return (
        <div className='max-w-7xl mx-auto mt-8'>
            <h2 className='text-xl font-bold'>সব পণ্য</h2>
            <p className='text-gray-400 mb-2'>মোট {products.length} টি পণ্য দেখানো হচ্ছে</p>
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
                {
                    products.map((product: IProduct) => <ProductCard key={product.id} product={product}></ProductCard>)
                }
            </div>
        </div>
    );
};

export default AllProducts;