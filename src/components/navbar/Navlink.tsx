// import { ICategory } from "@/types/categoryTypes";
// import Navbar from "./Navbar";

// const getCategories = async () => {
//   const res = await fetch(
//     "https://openapi.programming-hero.com/api/bazardor/categories",
//   );
//   if (!res.ok) {
//     throw new Error("Failed to fetch categories");
//   }
//   return res.json();
// };

// const Navlink = async() => {

//     const categories = await getCategories();
//     console.log(categories)

//     return (
//         <div>
//             {
//                 categories.map((category: ICategory) => <Navbar key={category.id} category={category}></Navbar>)
//             }
//         </div>
//     );
// };

// export default Navlink;



// import { ICategory } from "@/types/categoryTypes";
// import Navbar from "./Navbar";

// const getCategories = async (): Promise<ICategory[]> => {
//   const res = await fetch(
//     "https://openapi.programming-hero.com/api/bazardor/categories"
//   );

//   if (!res.ok) {
//     throw new Error("Failed to fetch categories");
//   }

//   const response = await res.json();

//   // Supports either a direct array or an object containing data
//   return response.data ?? response;
// };

// const Navlink = async () => {
//   const categories = await getCategories();

//   return <Navbar categories={categories} />;
// };

// export default Navlink;






import { ICategory } from "@/types/categoryTypes";
import Navbar from "./Navbar";

const getCategories = async (): Promise<ICategory[]> => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/categories"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  const response = await res.json();

  console.log("API response:", response);

  return Array.isArray(response)
    ? response
    : response.data;
};

const Navlink = async () => {
  const categories = await getCategories();

  return(
    <div>
      <Navbar categories={categories} />
    </div>
  );
};

export default Navlink;