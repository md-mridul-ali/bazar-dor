import { IProduct } from "@/types/productsTypes";
import Link from "next/link";


const ProductCard = ({ product }: { product: IProduct }) => {
  const data = product;
  const { nameBn, today, image } = product;

  return (
   <Link href={`/products/${product.id}`}>
       <div className="border-2 border-gray-200 rounded-2xl p-4 hover:border-gray-400">
      <div className="flex  items-center gap-2 ">
        <p className="px-3 py-3 bg-gray-300 rounded-xl">{image}</p>
        <div>
          <h2>{nameBn}</h2>
          <p className="text-gray-500">প্রতি কেজি</p>
        </div>
      </div>
      <p className="mt-2">আজকের দাম</p>
      <div className="flex justify-between">
        <p className="font-bold">{today} টাকা</p>
        <div className="px-2 py-1 bg-gray-200 rounded-3xl">
            {
                 product.change.dir === "low" || product.change.dir === "flat" ? (
                    <span className="text-green-600">▼ {product.change.pct} %</span>
                ) : (
                    <span className="text-red-600">▲ {product.change.pct} %</span>
                )
            }
        </div>
      </div>
    </div>
   </Link>
  );
};

export default ProductCard;
