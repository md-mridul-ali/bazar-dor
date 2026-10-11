
import Link from "next/link";
import { IProduct } from "@/types/productsTypes";
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";


const getProducts = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/bazardor/products');
    if(!res.ok) {
        throw new Error('Failed to fetch products');
    }
    return res.json();
}

const Marquee = async() => {

    const products = await getProducts();
    // console.log(products);

    return (
      <div className="border-t-2 border-b-2 mt-3 mb-5 border-neutral-100 bg-green-100">

            <div className="flex max-w-7xl mx-auto">

            <MarqueeText className="py-1" direction="right" duration={10}>
            
            {products.map((product: IProduct) => <Link href={`/products/${product.id}`} key={product.id} className="hover:underline">

                  <span>
             {" "}
             <span>{product.image}</span>
             <span className="text-gray-500" key={product.id}> {product.nameBn} </span>
             <span className="text-gray-500">{product.today} টাকা/কেজি</span>
             {
                product.change.dir === "low" || product.change.dir === "flat" ? (
                    <span className="text-green-600">▼ {product.change.pct} %</span>
                ) : (
                    <span className="text-red-600">▲ {product.change.pct} %</span>
                )
             }
             <span className="mx-5 text-gray-500">|</span>{" "}
           </span>
             
            </Link>
           
         )}

            </MarqueeText>
            </div>
        </div>
    );
};

export default Marquee;