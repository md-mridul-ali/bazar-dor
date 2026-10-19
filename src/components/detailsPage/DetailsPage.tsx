
import { IProduct } from "@/types/productsTypes";

const DetailsPage = ({ product }: { product: IProduct }) => {
  const {
    nameBn,
    categoryNameBn,
    categoryIcon,
    image,
    today,
    yesterday,
    change,
    markets,
    unit,
  } = product;

  const lowestMarket = [...markets].sort((a, b) => a.min - b.min)[0];
  const highestMarket = [...markets].sort((a, b) => b.max - a.max)[0];

  const averagePrice =
    markets.length > 0
      ? markets.reduce(
          (sum, market) => sum + (market.min + market.max) / 2,
          0
        ) / markets.length
      : 0;

  const difference = today - yesterday;

  const formatPrice = (price: number) =>
    price.toLocaleString("bn-BD", {
      maximumFractionDigits: 2,
    });

  const priceColor =
    change.dir === "up"
      ? "text-red-600"
      : change.dir === "down"
        ? "text-green-600"
        : "text-gray-500";

  return (
    <main className="mx-auto w-full max-w-7xl space-y-5 px-3 py-5 sm:px-5 sm:py-7 lg:px-8 lg:py-8">
      {/* Product Header */}
      <section className="flex flex-col gap-5 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6 md:flex-row md:items-center md:justify-between md:p-8">
        {/* Product Information */}
        <div className="flex min-w-0 items-start gap-3 sm:items-center sm:gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-green-50 text-3xl sm:h-16 sm:w-16 sm:text-4xl">
            {image || categoryIcon || "🛒"}
          </div>

          <div className="min-w-0">
            <h1 className="break-words text-lg font-extrabold text-gray-900 sm:text-xl lg:text-2xl">
              {nameBn}
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              প্রতি {unit === "kg" ? "কেজি" : unit} · {categoryNameBn}
            </p>

            <p className={`mt-2 text-sm leading-6 ${priceColor}`}>
              {change.dir === "up" ? (
                <>
                  ▲ গতকালের তুলনায় {formatPrice(Math.abs(difference))} টাকা
                  দাম বেড়েছে
                </>
              ) : change.dir === "down" ? (
                <>
                  ▼ গতকালের তুলনায় {formatPrice(Math.abs(difference))} টাকা
                  দাম কমেছে
                </>
              ) : (
                "— গতকালের তুলনায় দাম অপরিবর্তিত"
              )}
            </p>
          </div>
        </div>

        {/* Today's Price */}
        <div className="flex w-full items-center justify-between gap-3 rounded-xl bg-green-50 p-4 sm:p-5 md:w-auto md:min-w-48 md:flex-col md:items-start">
          <div>
            <p className="text-sm text-gray-500">আজকের দাম</p>

            <p className="mt-1 text-2xl font-extrabold text-green-700 sm:text-3xl">
              ৳{formatPrice(today)}
            </p>

            <p className="mt-1 text-xs text-gray-500">
              টাকা / {unit === "kg" ? "কেজি" : unit}
            </p>
          </div>

          <span
            className={`shrink-0 rounded-full bg-white px-3 py-1.5 text-sm font-semibold ${priceColor}`}
          >
            {change.dir === "up"
              ? "▲"
              : change.dir === "down"
                ? "▼"
                : "—"}{" "}
            {formatPrice(Math.abs(change.pct))}%
          </span>
        </div>
      </section>

      {/* Price Summary */}
      <section className="rounded-2xl border border-gray-200 bg-[#f9fbf9] p-4 sm:p-6 lg:p-7">
        <h2 className="mb-4 text-base font-bold text-gray-800 sm:text-lg">
          দামের সারসংক্ষেপ
        </h2>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {/* Lowest Price */}
          <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5">
            <p className="text-sm text-gray-500">সর্বনিম্ন দাম</p>

            <p className="mt-2 break-words text-xl font-bold text-green-600 sm:text-2xl">
              {lowestMarket ? `৳${formatPrice(lowestMarket.min)}` : "—"}
            </p>

            <p className="mt-1 text-xs text-gray-500">
              {lowestMarket?.market ?? "তথ্য নেই"}
            </p>
          </div>

          {/* Highest Price */}
          <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5">
            <p className="text-sm text-gray-500">সর্বাধিক দাম</p>

            <p className="mt-2 break-words text-xl font-bold text-red-500 sm:text-2xl">
              {highestMarket ? `৳${formatPrice(highestMarket.max)}` : "—"}
            </p>

            <p className="mt-1 text-xs text-gray-500">
              {highestMarket?.market ?? "তথ্য নেই"}
            </p>
          </div>

          {/* Average Price */}
          <div className="rounded-xl border border-gray-200 bg-white p-4 sm:col-span-2 sm:p-5 lg:col-span-1">
            <p className="text-sm text-gray-500">গড় দাম</p>

            <p className="mt-2 break-words text-xl font-bold text-green-600 sm:text-2xl">
              {markets.length > 0
                ? `৳${formatPrice(averagePrice)}`
                : "—"}
            </p>

            <p className="mt-1 text-xs text-gray-500">
              প্রতি {unit === "kg" ? "কেজি" : unit}-এর গড় হিসাব
            </p>
          </div>
        </div>

        {/* Market Table */}
        <div className="mt-7">
          <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-base font-bold text-gray-800 sm:text-lg">
              বাজারভিত্তিক আজকের দাম
            </h2>

            <p className="text-xs text-gray-500">
              মোট {markets.length.toLocaleString("bn-BD")}টি বাজার
            </p>
          </div>

          <div className="overflow-hidden rounded-xl border border-gray-200">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[620px] text-left text-sm">
                <thead className="bg-white text-gray-500">
                  <tr>
                    <th className="whitespace-nowrap px-3 py-3 font-semibold sm:px-4">
                      বাজার
                    </th>
                    <th className="whitespace-nowrap px-3 py-3 font-semibold sm:px-4">
                      বিভাগ
                    </th>
                    <th className="whitespace-nowrap px-3 py-3 text-right font-semibold sm:px-4">
                      সর্বনিম্ন
                    </th>
                    <th className="whitespace-nowrap px-3 py-3 text-right font-semibold sm:px-4">
                      সর্বোচ্চ
                    </th>
                    <th className="whitespace-nowrap px-3 py-3 text-right font-semibold sm:px-4">
                      গড়
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {markets.map((market, index) => {
                    const average = (market.min + market.max) / 2;

                    return (
                      <tr
                        key={`${market.market}-${index}`}
                        className="border-t border-gray-200 transition-colors even:bg-[#f0f5f0] hover:bg-green-50"
                      >
                        <td className="whitespace-nowrap px-3 py-3 font-medium text-gray-800 sm:px-4">
                          {market.market}
                        </td>

                        <td className="whitespace-nowrap px-3 py-3 text-gray-600 sm:px-4">
                          {market.division}
                        </td>

                        <td className="whitespace-nowrap px-3 py-3 text-right sm:px-4">
                          ৳{formatPrice(market.min)}
                        </td>

                        <td className="whitespace-nowrap px-3 py-3 text-right sm:px-4">
                          ৳{formatPrice(market.max)}
                        </td>

                        <td className="whitespace-nowrap px-3 py-3 text-right font-semibold text-gray-800 sm:px-4">
                          ৳{formatPrice(average)}
                        </td>
                      </tr>
                    );
                  })}

                  {markets.length === 0 && (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-4 py-8 text-center text-gray-500"
                      >
                        বাজারের কোনো তথ্য পাওয়া যায়নি।
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <p className="mt-2 text-xs text-gray-400 sm:hidden">
            সব কলাম দেখতে টেবিলটি ডানে-বামে স্ক্রল করুন।
          </p>
        </div>
      </section>
    </main>
  );
};

export default DetailsPage;

