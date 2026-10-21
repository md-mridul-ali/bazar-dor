import Navbar from "./Navbar";
import { cacheLife } from "next/cache";

const getCategories = async () => {

 "use cache";
  cacheLife("hours");

  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/categories"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  const response = await res.json();

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
