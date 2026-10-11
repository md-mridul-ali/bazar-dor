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

//      const categories = await getCategories();

//     return (
//         <div>
//             {
//                 categories.map((categories: ICategory) => <Navbar key={categories.id} categories={categories}></Navbar>)
//             }
//         </div>
//     );
// };

// export default Navlink;