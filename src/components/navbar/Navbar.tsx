import { ICategory } from "@/types/categoryTypes";
import logo from "../../assets/logo-icon.png";
import Image from "next/image";
import Link from "next/link";
import DatePage from "./DatePage";
import UserInfo from "../userInfo/UserInfo";

const Navbar = ({ categories }: { categories: ICategory[] }) => {

  return (
    <div className="bg-base-100 shadow-sm">
      <div className="navbar max-w-7xl mx-auto">
        {/* Logo and Mobile Menu */}
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
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>

            {/* Mobile Categories */}
            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
            >
              {categories?.map((category) => (
                <li key={category.id}>
                  {/* className={` ${pathName === '/categories/${category.slug}' ? 'px-6 rounded-full bg-[#18230F] text-[#C2F800]' : ''}`} */}
                  <Link href={`/categories/${category.slug}`}>
                    <span>{category.icon}</span>
                    {category.nameBn}
                  </Link>
                </li>
              ))}
              
            </ul>
          </div>

          <Link className="flex items-center gap-2" href="/">
            <div className="hidden md:flex items-center justify-center h-12 w-12 bg-green-500 rounded-2xl">
              <Image className="h-8 w-8" src={logo} alt="Logo" />
            </div>

            <div>
              <p className="text-xl">বাজার দর</p>
              <div className="text-xs text-neutral-500">
                  <DatePage />
              </div>
            </div>
          </Link>
        </div>

        {/* Desktop Categories */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
           
            {categories?.map((category) => (
              <li key={category.id}>
                <Link href={`/categories/${category.slug}`}>
                  <span>{category.icon}</span>
                  {category.nameBn}
                </Link>
              </li>
            ))}

          </ul>
        </div>

        {/* Authentication Links */}
        <div className="navbar-end gap-2">
           <UserInfo></UserInfo>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
