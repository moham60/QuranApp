import { useEffect, useState } from "react";
import { MdContentCopy } from "react-icons/md";
import { LuRotateCcw } from "react-icons/lu";
import { FaCheckDouble } from "react-icons/fa6";
export default function CategoryZekrDetails({ name, items, onClose }) {
   
 const [counts, setCounts] = useState([]);

  // ✅ تحديث counts لما name أو items تتغير
  useEffect(() => {
    const savedCounts = JSON.parse(localStorage.getItem("counts")) || {};
    const existingCounts = savedCounts[name] || [];
    const newCounts = Array.from({ length: items.length }, (_, i) => existingCounts[i] || 0);
    setCounts(newCounts);
  }, [name, items]);
   const handleIncrementCount = (index, totalCount) => {
        if (counts[index] < totalCount) {
    const newCounts = [...counts];
    newCounts[index] += 1;
    setCounts(newCounts);

    // حفظ التحديث في localStorage
    const allCounts = JSON.parse(localStorage.getItem("counts")) || {};
    allCounts[name] = newCounts;
    localStorage.setItem("counts", JSON.stringify(allCounts));
            }
        };

        const handleResetCount = (index) => {
  const newCounts = [...counts];
  newCounts[index] = 0;
  setCounts(newCounts);

  const allCounts = JSON.parse(localStorage.getItem("counts")) || {};
  allCounts[name] = newCounts;
  localStorage.setItem("counts", JSON.stringify(allCounts));
};

  const [copiedIndex, setCopiedIndex] = useState(null);
    // ✅ دالة النسخ
  const handleCopy = (index, text) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);

    setTimeout(() => setCopiedIndex(null), 800);
  };
    return (
        <div className="p-4 dark:text-white my-2">
            {items.length>0&&<div className="flex items-center justify-between">
              <h4 >{name}</h4>
              <button onClick={onClose} className="dark:bg-gray-800 bg-white shadow hover:bg-gray-100 cursor-pointer px-4 py-2 rounded dark:hover:bg-gray-600 ">
                  اغلاق
              </button>
          </div>}
          
          {items.map((zekr,idx) => 
                {
               
              return <div
                  onClick={() => {
                     handleIncrementCount(idx,zekr.count)
                  }}
                  dir='rtl' key={idx} className="dark:bg-gray-800 my-4 rounded-lg  group hover:cursor-pointer relative transition-all duration-300 border border-gray-200 hover:border-emerald-600 dark:border-gray-800 dark:hover:border-emerald-800 px-4 pt-10 sm:pt-20 pb-10 ">
                  <p className="md:text-3xl group-hover:text-emerald-400">{zekr.content}</p>
                   <span className="text-2xl absolute   sm:opacity-0 group-hover:opacity-100   right-4 top-2 text-gray-400 dark:text-gray-500  transition-all duration-300">انقر للعد ✨</span>
                      <div className="flex mt-5 items-center justify-center gap-4 flex-wrap">
                          <div className=" w-full md:w-[49%] rounded-xl px-3 py-4 text-center bg-white shadow dark:bg-gray-900 
                          dark:text-blue-700 text-blue-500
                          ">
                              <span className='text-xl'> التكرار{zekr.count}/
                                  {counts[idx]}
                              </span>
                          </div>
                      <div className={`  w-full md:w-[49%] rounded-xl px-3 py-4 text-center shadow-lg 
                          
                        ${zekr.count - counts[idx] > 0 ?
                          "dark:bg-gray-900  bg-white dark:text-emerald-500 text-emerald-600 " :
                          "bg-emerald-400 text-white dark:bg-emerald-500 shadow-emerald-300 dark:shadow-emerald-400"
                        }
                          `}>
                          <span className='text-xl'>المتبقي {zekr.count-counts[idx]}  </span>
                      </div>
                      <div className="flex flex-row gap-1 items-center   sm:flex-col absolute left-4 top-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // علشان مايزودش العد لما تضغط على الزر
                        handleCopy(idx, zekr.content);
                      }}    
                      className="text-xl cursor-pointer dark:bg-[#4B5563] dark:text-[#9098A4] bg-white  shadow p-3 flex rounded-xl hover:bg-gray-100 hover:scale-105    text-gray-400 dark:hover:bg-[#4B5562] sm:opacity-0  sm:group-hover:opacity-100 transition-all duration-100">
                           {copiedIndex === idx ? <FaCheckDouble className="text-emerald-500" /> : <MdContentCopy />}
                          </button>
                          <button
                              onClick={() => {
                                  handleResetCount(idx)
                              }}
                            className="text-xl cursor-pointer dark:bg-[#4B5563] dark:text-[#9098A4] bg-white  shadow p-3 flex rounded-xl hover:bg-gray-100 hover:scale-105    text-gray-400 dark:hover:bg-[#4B5562] sm:opacity-0  sm:group-hover:opacity-100 transition-all duration-100">
                           <LuRotateCcw />


                          </button>

                      </div>
                  </div>
                   
                  </div>
              
              }
              
          )}
    </div>
  )
}
