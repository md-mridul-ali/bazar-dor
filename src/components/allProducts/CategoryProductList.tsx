
"use client";

import { useState } from "react";
import ProductCard from "@/components/allProducts/ProductCard";
import { IProduct } from "@/types/productsTypes";

const CategoryProductList = ({
  products,
}: {
  products: IProduct[];
}) => {
  const [sortOrder, setSortOrder] = useState("default");

  const sortedProducts = [...products].sort((a, b) => {
    if (sortOrder === "low-to-high") {
      return a.today - b.today;
    }

    if (sortOrder === "high-to-low") {
      return b.today - a.today;
    }

    return a.id - b.id;
  });

  return (
    <>
      {/* Sort Dropdown */}
      <div className="mt-5 flex items-center justify-end gap-2 rounded-xl border border-gray-200 bg-white p-3">
        <label
          htmlFor="price-sort"
          className="text-sm text-gray-500"
        >
          সাজান
        </label>

        <select
          id="price-sort"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="select select-bordered select-sm w-36 rounded-lg"
        >
          <option value="default">ডিফল্ট</option>
          <option value="low-to-high">দাম: কম থেকে বেশি</option>
          <option value="high-to-low">দাম: বেশি থেকে কম</option>
        </select>
      </div>

      {/* Product Count */}
      <p className="py-3 text-sm text-gray-500">
        মোট {sortedProducts.length}টি পণ্য দেখানো হচ্ছে
      </p>

      {/* Sorted Products */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};

export default CategoryProductList;
