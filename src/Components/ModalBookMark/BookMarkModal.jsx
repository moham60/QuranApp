import { useDispatch, useSelector} from "react-redux";
import { deleteAyahFromBookMark,setOpenBookMark } from "../../redux/feature/Quran";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
export default function BookMarkModal({ isopen }) {
  const dispatch = useDispatch();
const {  currentBookmarkAyat } =
    useSelector((state) => state.Quran);
    const [sortedBookmarkAyat, setSortedBookmarkAyat] = useState([]);

  const [orderByNewest, setorder] = useState(true);
  useEffect(() => {
    setSortedBookmarkAyat(currentBookmarkAyat);
  },[])
  function handleSort(orderByNewest) {
    const sorted = [...currentBookmarkAyat].sort((a, b) =>
      orderByNewest
        ? new Date(b.addAt).getTime() - new Date(a.addAt).getTime()
        : new Date(a.addAt).getTime() - new Date(b.addAt).getTime()
    );
    setSortedBookmarkAyat(sorted);
  }
  const navigte = useNavigate();
  return isopen ? (
    <div className="absolute z-50   inset-0   h-screen flex justify-center items-center">
      <div
        tabIndex={-1}
        className="    fixed z-40 top-[50%] translate-x-[-50%] left-[50%] translate-y-[-50%]  justify-center w-full sm:max-w-xl items-center max-h-full">
        <div className="relative  max-h-4xl overflow-y-auto  p-4 w-[100%] sm:w-[80%] md:w-[75%] m-auto   ">
          <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-800">
            <div className="flex gap-2 items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
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
                className="lucide lucide-bookmark h-5 w-5 text-emerald-500">
                <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
              </svg>

              <h3 dir="rtl" className="text-xl font-semibold  dark:text-white">
                <span className="text-gray-400">
                  ({currentBookmarkAyat.length}){" "}
                </span>
                العلامات المرجعية
              </h3>
              <button
                onClick={() => dispatch(setOpenBookMark(false))}
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="static-modal">
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14">
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {/* Modal body */}
            <div className="px-4 py-10 flex flex-col    ">
              <div className="relative flex items-center gap-2">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20">
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>

                <input
                  dir="rtl"
                  type="search"
                  id="default-search"
                  autoComplete="off"
                  className="block w-full p-2   text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="البحث في العلامات المرجعية"
                />
                <button
                  onClick={() => {
                    setorder(!orderByNewest);
                    handleSort(orderByNewest);
                  }}
                  title={orderByNewest ? "الأحدث أولا" : " الأقدم أولا"}
                  className="orderByTime hover:bg-gray-200  dark:text-gray-400 rounded-xl p-2  dark:hover:bg-gray-600  cursor-pointer">
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
                    className="lucide 
                        dark:hover:text-white rounded-md lucide-arrow-up-narrow-wide h-4 w-4 ">
                    <path d="m3 8 4-4 4 4" />
                    <path d="M7 4v16" />
                    <path d="M11 12h4" />
                    <path d="M11 16h7" />
                    <path d="M11 20h10" />
                  </svg>
                </button>
              </div>

              {sortedBookmarkAyat.length === 0 ? (
                <div className="emtpy flex flex-col justify-center items-center mt-8  ">
                  <div
                    className=" 
                        w-12 inline-flex  justify-center items-center p-2 h-12 bg-gray-700  rounded-full 
                          ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-bookmark h-10 w-10 text-gray-500">
                      <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
                    </svg>
                  </div>
                  <p className="mt-2 sm:text-2xl dark:text-gray-400">
                    لا توجد علامات مرجعية
                  </p>
                </div>
              ) : (
                sortedBookmarkAyat.map((el) => (
                  <div
                    key={el.number}
                    onClick={() => {
                      dispatch(setOpenBookMark(false));
                      navigte(`/sura/${el.numberSura}`, {
                        state: { scrollToAyah: el.numberInSurah },
                      });
                    }}
                    className="flex group  transition-all   p-1 rounded-xl cursor-pointer mt-4 items-center gap-8  dark:text-white w-full ">
                    <span className="bg-gradient-to-br group-hover:scale-105 transition-all duration-300 from-emerald-500 to-blue-500 rounded-xl text-white w-12 h-12 flex justify-center items-center">
                      {el.numberInSurah}:{el.numberSura}
                    </span>

                    <div className="date     flex-1  text-gray-400">
                      <p className="text-xl group-hover:text-emerald-400   transition-all duration-300">
                        {el.nameOfSura}
                      </p>
                      <span className="flex items-center gap-1">
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
                          className="lucide lucide-clock h-3 w-3">
                          <circle cx={12} cy={12} r={10} />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                        {new Date(el.addAt).toLocaleString().slice(10)}{" "}
                        الأية {el.numberInSurah}
                      </span>
                    </div>

                 <span className="arraw hidden group-hover:block transition-all duration-300">
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
                        className="lucide lucide-chevron-right h-5 w-5 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        <path d="m9 18 6-6-6-6" />
                      </svg>
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        dispatch(deleteAyahFromBookMark(el));
                      }}
                      className="deleteBookMark cursor-pointer hover:text-red-600">
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
                        className="lucide lucide-trash2 h-4 w-4 ">
                        <path d="M3 6h18" />
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                        <line x1={10} x2={10} y1={11} y2={17} />
                        <line x1={14} x2={14} y1={11} y2={17} />
                      </svg>
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
 
   

}
