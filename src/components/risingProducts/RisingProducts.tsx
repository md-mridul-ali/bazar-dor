import { IProduct } from "@/types/productsTypes";
import ProductCard from "../allProducts/ProductCard";

const getRisingProducts = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
  );

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }
  return res.json();
};

const RisingProducts = async () => {
  const products = await getRisingProducts();
  const filterProduct = products
    .filter((product: IProduct) => product.change.dir === "up")
    .sort(
      (a: IProduct, b: IProduct) => Number(b.change.pct) - Number(a.change.pct),
    )
    .slice(0, 6)

  return (
    <div className="max-w-7xl mx-auto mt-8">
      <div className="flex gap-2">
        <span className="text-red-600">▲</span>
        <h2 className="text-xl font-bold mb-3">আজ দাম বেড়েছে</h2>
      </div>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
            {
                filterProduct.map((product: IProduct) => <ProductCard key={product.id} product={product}></ProductCard>)
            }
        </div>
    </div>
  );
};

export default RisingProducts;
