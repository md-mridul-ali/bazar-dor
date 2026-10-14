import ProductCard from "@/components/allProducts/ProductCard";
import { IProduct } from "@/types/productsTypes";

interface ICategoryDetails {
  params: Promise<{ category: string }>;
}

const CategoryWisePage = async ({ params }: ICategoryDetails) => {
  const { category } = await params;

  const res = await fetch(
    `https://openapi.programming-hero.com/api/bazardor/products?category=${category}`,
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const categoriesData = await res.json();
 

  return (
    <div className="max-w-7xl mx-auto">
        <div className="py-8 w-full border-2 border-gray-200 rounded-xl flex gap-2 justify-start items-center px-4">
          <div className="h-12 w-12 rounded-xl bg-gray-200 flex justify-center items-center">
            {
              categoriesData[0]?.image
            }
          </div>
           <div>
            <h2 className="text-xl font-bold">{categoriesData[0]?.categoryNameBn}</h2>
            <p className="text-gray-400">{categoriesData.length}টি পণ্যের আজকের দাম ও পরিবর্তন</p>
           </div>
        </div>
        <p className="text-gray-400 py-3">মোট {categoriesData.length}টি পণ্য দেখানো হচ্ছে</p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categoriesData.map((product: IProduct) => (
          <ProductCard key={product.id} product={product}></ProductCard>
        ))}
      </div>
    </div>
  );
};

export default CategoryWisePage;
