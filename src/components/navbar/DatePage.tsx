
// const DatePage = async() => {

//     const date = new Date().toLocaleDateString("bn-Bd", {
//     dateStyle: "full",
//   })

//     return (
//         <div>
//          {date}
//         </div>
//     );
// };

// export default DatePage;



"use client";

import { useEffect, useState } from "react";

const DatePage = () => {
  const [date, setDate] = useState("");

  useEffect(() => {
    const currentDate = new Date().toLocaleDateString("bn-BD", {
      dateStyle: "full",
    });

    setDate(currentDate);
  }, []);

  return <span>{date || "তারিখ লোড হচ্ছে..."}</span>;
};

export default DatePage;
