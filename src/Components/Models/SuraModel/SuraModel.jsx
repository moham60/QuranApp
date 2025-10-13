import { useParams } from "react-router"

export default function SuraModel({metaData,setmodelOfSuraData,modelOfSuraData}) {
 
    const { number } = useParams();
    return (
        <>
             {modelOfSuraData ? (
              <div className="modelMetaDataOfSura fixed h-screen  inset-0 bg-gray-400/10  z-50 flex items-center justify-center     ">
                <div className="model  dark:bg-gray-800 rounded-2xl w-[90%] sm:w-[80%] md:w-[60%] lg:w-[50%] max-h-[85vh]  overflow-auto  bg-white">
                  <div className=" relative  border-b p-4 gap-2 border-gray-400 flex items-center  ">
                    <h2 className="text-2xl dark:text-white">
                      {metaData.name}
                    </h2>
                    <button
                      onClick={() => setmodelOfSuraData(false)}
                      className="closeMetaDataofSura absolute right-1  dark:text-white cursor-pointer hover:bg-gray-500 rounded p-2 ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-x h-4 w-4">
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                      </svg>
                    </button>
                  </div>
                  <div
                    className="m-4   text-center dark:text-white px-4 py-6 rounded-2xl
                bg-gradient-to-br     from-emerald-500/10 dark:to-blue-500/10">
                    <h2 className="text-2xl text-emerald-600 dark:text-emerald-400">
                      {metaData.name}
                    </h2>
                    <h3 className="my-2">{metaData.englishName}</h3>
                    <h4 className="text-emerald-700  dark:bg-emerald-800 dark:text-emerald-200 bg-emerald-200 rounded-xl w-fit px-4 m-auto">
                      {metaData.revelationType == "Meccan" ? "مكية" : "مدنية"}
                    </h4>
                  </div>
                  <div
                    className="m-4  p-2 py-6 rounded-2xl
                bg-gradient-to-br flex flex-col sm:flex-row items-center justify-center   gap-2    from-emerald-500/10 dark:to-blue-500/10"
                    dir="rtl">
                    <div className="right text-xl dark:text-white   w-[100%] sm:w-[50%]  h-[270px] px-2 py-2 rounded dark:bg-gray-800">
                      <p className="dark:text-gray-500 my-1 text-gray-400">
                        موقع السورة في المصحف
                      </p>
                      <p className="dark:text-gray-500 my-1 text-gray-400">
                        الصفحات
                      </p>
                      <p>
                        من صفحة {metaData.ayahs[0].page} إلى صفحة{" "}
                        {metaData.ayahs[metaData.ayahs.length - 1].page}
                      </p>
                      <p className="dark:text-gray-500 my-1 text-gray-400">
                        عدد الآيات{" "}
                      </p>
                      <p>{metaData.numberOfAyahs}</p>
                    </div>
                    <div className="left text-xl dark:text-white w-[100%] sm:w-[50%]  h-[270px] px-2  py-2 rounded dark:bg-gray-800">
                      <p className="dark:text-gray-500 my-1 text-gray-400">
                        معلومات السورة
                      </p>
                      <p className="dark:text-gray-500 my-1 text-gray-400">
                        الترتيب في المصحف
                      </p>
                      <p>السورة رقم {metaData.order}</p>
                      <p className="dark:text-gray-500 my-1 text-gray-400">
                        الترتيب في القرأن
                      </p>
                      <p>{number}</p>
                      <p className="dark:text-gray-500 my-1 text-gray-400">
                        مكان النزول
                      </p>
                      <p>
                        نزلت في{" "}
                        {metaData.revelationType === "Medinan"
                          ? "المدينة المنورة"
                          : "مكة"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
        </>
  )
}
