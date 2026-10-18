import { IProduct } from "@/types/productsTypes";

const DetailsPage = ({ product }: { product: IProduct }) => {
  const { nameBn, categoryNameBn, image, today, yesterday, markets } = product;

  const lowestMarket = [...markets].sort((a, b) => a.min - b.min)[0];
  const highestMarket = [...markets].sort((a, b) => b.max - a.max)[0];
  const averagePrice = markets.reduce((sum, market) => sum + (market.min + market.max) / 2, 0) / markets.length;


  return (
    <div>
      <div className="py-8 w-full border-2 border-gray-200 rounded-xl px-4 flex justify-between items-center">
        <div className="flex gap-2 justify-start items-center">
          <div className="h-20 w-20 rounded-xl bg-gray-200 flex justify-center items-center">
            {image}
          </div>

          <div>
            <h2 className="font-extrabold">{nameBn}</h2>
            <p className="text-gray-400">প্রতি কেজিㆍ{categoryNameBn}</p>
            <p className="text-gray-400">
              গতকালের তুলনায় আজ দাম বেড়েছেㆍ{today - yesterday} টাকা
            </p>
          </div>
        </div>

        <div className="p-4 bg-gray-200 rounded-xl">
          <h2 className="text-gray-400">আজকের দাম</h2>
          <p className="flex-col justify-start items-center">{today}</p>
          <p className="text-gray-400">টাকা / কেজি</p>
          <p>
            {product.change.dir === "low" || product.change.dir === "flat" ? (
              <span className="text-green-600">▼ {product.change.pct} %</span>
            ) : (
              <span className="text-red-600">▲ {product.change.pct} %</span>
            )}
          </p>
        </div>
      </div>

      <section className="rounded-2xl border border-gray-200 mt-6 bg-[#f9fbf9] p-4 sm:p-6">
        {/* Price Summary */}
        <h2 className="mb-4 text-lg font-bold text-gray-800">
          দামের সারসংক্ষেপ
        </h2>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {/* Lowest Price */}
          <div className="rounded-2xl border border-gray-200 p-5">
            <p className="text-sm text-gray-500">সর্বনিম্ন দাম</p>
            <p className="mt-1 text-2xl font-bold text-green-600">
              {lowestMarket.min} টাকা
            </p>
            <p className="mt-1 text-xs text-gray-500">সবচেয়ে কম দামের বাজার</p>
          </div>

          {/* Highest Price */}
          <div className="rounded-2xl border border-gray-200 p-5">
            <p className="text-sm text-gray-500">সর্বাধিক দাম</p>
            <p className="mt-1 text-2xl font-bold text-red-500">
              {highestMarket.max} টাকা
            </p>
            <p className="mt-1 text-xs text-gray-500">সবচেয়ে বেশি দামের বাজার</p>
          </div>

          {/* Average Price */}
          <div className="rounded-2xl border border-gray-200 p-5">
            <p className="text-sm text-gray-500">গড় দাম</p>
            <p className="mt-1 text-2xl font-bold text-green-600">
              {Math.round(averagePrice * 100) / 100} টাকা
            </p>
            <p className="mt-1 text-xs text-gray-500">প্রতি কেজির গড় হিসাব</p>
          </div>
        </div>

        {/* Market Comparison */}
        <h2 className="mb-4 mt-7 text-lg font-bold text-gray-800">
          বাজারভিত্তিক আজকের দাম
        </h2>

        <div className="overflow-x-auto rounded-2xl border border-gray-200">
          <table className="w-full min-w-[600px] text-left text-sm">
            <thead className="bg-white text-gray-500">
              <tr>
                <th className="px-4 py-3 font-semibold">বাজার</th>
                <th className="px-4 py-3 font-semibold">বিভাগ</th>
                <th className="px-4 py-3 text-right font-semibold">
                  সর্বনিম্ন
                </th>
                <th className="px-4 py-3 text-right font-semibold">সর্বোচ্চ</th>
                <th className="px-4 py-3 text-right font-semibold">গড়</th>
              </tr>
            </thead>

            <tbody>
              {markets.map((market, index) => {
                const average = (market.min + market.max) / 2;

                return (
                  <tr
                    key={`${market.market}-${index}`}
                    className="border-t border-gray-200 transition hover:bg-green-50 even:bg-[#f0f5f0]"
                  >
                    <td className="whitespace-nowrap px-4 py-3 font-medium text-gray-800">
                      {market.market}
                    </td>

                    <td className="whitespace-nowrap px-4 py-3 text-gray-600">
                      {market.division}
                    </td>

                    <td className="whitespace-nowrap px-4 py-3 text-right">
                      {market.min} টাকা
                    </td>

                    <td className="whitespace-nowrap px-4 py-3 text-right">
                      {market.max} টাকা
                    </td>

                    <td className="whitespace-nowrap px-4 py-3 text-right font-semibold text-gray-800">
                      {Math.round(average * 100) / 100} টাকা
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default DetailsPage;
