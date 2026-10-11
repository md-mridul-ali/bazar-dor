
import AllProducts from "@/components/allProducts/AllProducts";
import FallingProducts from "@/components/fallingProducts/FallingProducts";
import Hero from "@/components/hero/Hero";
import RisingProducts from "@/components/risingProducts/RisingProducts";
import Image from "next/image";

export default function Home() {
  return (
   <div>
    <Hero></Hero>
    <RisingProducts></RisingProducts>
    <FallingProducts></FallingProducts>
    <AllProducts></AllProducts>
   </div>
  );
}
