import CategoryProductList from "@/components/allProducts/CategoryProductList";
import { IProduct } from "@/types/productsTypes";
import { cacheLife } from "next/cache";

interface ICategoryDetails {
  params: Promise<{ category: string }>;
}

const CategoryWisePage = async ({ params }: ICategoryDetails) => {

  "use cache";
  cacheLife("hours");

  const { category } = await params;

  const res = await fetch(
    `https://openapi.programming-hero.com/api/bazardor/products?category=${category}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const categoriesData: IProduct[] = await res.json();

  return (
    <main className="mx-auto max-w-7xl px-4 py-5 sm:px-6">
      {/* Category Header */}
      <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-5 sm:py-6">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-2xl">
          {categoriesData[0]?.categoryIcon ?? "🛒"}
        </div>

        <div>
          <h2 className="text-xl font-bold">
            {categoriesData[0]?.categoryNameBn ?? "পণ্য"}
          </h2>

          <p className="text-sm text-gray-500">
            {categoriesData.length}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </div>

      {/* Sorting and Product Grid */}
       <CategoryProductList products={categoriesData} />
    </main>
  );
};

export default CategoryWisePage;

