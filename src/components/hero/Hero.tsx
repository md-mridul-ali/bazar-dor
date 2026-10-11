import Image from "next/image";
import hero from "../../assets/bazar-hero.png";
import Link from "next/link";

const Hero = () => {
   const date = new Date().toLocaleDateString("bn-Bd", {
    dateStyle: "full",
  })
  return (
 
      <div className="hero max-w-7xl mx-auto border-2 border-gray-300 rounded-2xl">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <Image src={hero} alt="Hero Image" width={400} height={400} />
          <div>
            <button className="bg-green-100 px-3 py-2 rounded-4xl text-green-500 mb-2">{date}</button>
            <h1 className="text-5xl font-bold">আজকের বাজারের দাম এক নজরে</h1>
            <p className="py-6 text-gray-400">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক <br></br>
              বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
            </p>
            <Link href="/" className="px-3 py-2 bg-green-500 text-white rounded-md">
              সব পণ্য দেখুন
            </Link>
          </div>
        </div>
      </div>
  
  );
};

export default Hero;
