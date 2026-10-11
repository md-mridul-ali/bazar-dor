import { ICategory } from "@/types/categoryTypes";
import logo from "../../assets/logo-icon.png";
import Image from "next/image";
import Link from "next/link";


const getCategories = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/categories",
  );
  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }
  return res.json();
};

const Navbar = async () => {

  const date = new Date().toLocaleDateString("bn-Bd", {
    dateStyle: "full",
  })
  const categories = await getCategories();

  return (
    <div className="bg-base-100 shadow-sm">
      <div className="navbar max-w-7xl mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                aria-label="Menu"
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {categories.map((category: ICategory) => (
                <li key={category.id}>
                  <Link href={`/categories/${category.category}`}>
                    <span>{category.icon}</span>
                    {category.nameBn}
                  </Link>
                </li>
              ))}
             
            </ul>
          </div>
          <Link className="flex items-center gap-2" href="/">
            <div className="hidden md:flex items-center justify-center h-12 w-12 bg-green-500 rounded-2xl">
              <Image className="h-8 w-8 " src={logo} alt="Logo" />
            </div>
            <div>
              <p className=" text-xl">বাজার দর</p>
              
                <p className="text-xs text-neutral-500">{date}</p>
                {/* <Date></Date> */}

             
            </div>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {categories.map((category: ICategory) => (
              <li key={category.id}>
                <Link href={`/categories/${category.id}`}>
                  <span>{category.icon}</span>
                  {category.nameBn}
                </Link>
              </li>
            ))}
           
          </ul>
        </div>
        <div className="navbar-end gap-2">
          <Link href="/signin" className="">
            সাইন ইন
          </Link>
          <Link
            href="/signup"
            className="px-3 py-2 rounded-xl text-white bg-green-500 ml-2"
          >
            সাইন আপ
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
