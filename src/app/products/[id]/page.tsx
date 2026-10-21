import DetailsPage from "@/components/detailsPage/DetailsPage";
import { cacheLife } from "next/cache"

interface IProductDetails{
    params: Promise<{ id: number }>;
}

const ProductDetailsPage = async({params} : IProductDetails) => {

    "use cache";
    cacheLife("hours");

    const {id} = await params;

    const res = await fetch(`https://openapi.programming-hero.com/api/bazardor/products/${id}`);
    if(!res.ok){
        throw new Error("Failed to Fetch the Data");
    }
    const product = await res.json();
    const {nameBn, categoryNameBn} = product;

    return (
        <div className="max-w-7xl mx-auto">
            <p className="text-gray-400 mb-5">{`হোম › ${categoryNameBn} › ${nameBn}`}</p>
            <DetailsPage product={product}></DetailsPage>
        </div>
    );
};

export default ProductDetailsPage;