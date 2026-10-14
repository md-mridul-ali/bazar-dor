'use client'
const DatePage = async() => {

    const date = new Date().toLocaleDateString("bn-Bd", {
    dateStyle: "full",
  })

    return (
        <div>
         {date}
        </div>
    );
};

export default DatePage;