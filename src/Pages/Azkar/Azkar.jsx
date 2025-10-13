import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  Link } from "react-router";
import { useEffect, useMemo, useState } from "react";
import CategoryZekr from "../../Components/CategoryZekr/CategoryZekr";
import data from "../../azkar_no_extra_commas.json"
import CategoryZekrDetails from "../../Components/CategoryZekrDetails/CategoryZekrDetails";
export default function Azkar() {
  useEffect(() => {
    document.title = "الأذكار";
  }, []);
 
  const zekrCategories =
    useMemo(() => {
      return Object.keys(data).map((key) => ({ name: key, items: data[key] }))
    }, []);
  const [openCategory, setOpenCategory] = useState(null);
  const [activeArray, setactiveArray] = useState(new Array(8).fill(false))
  const handleActive = (index) => {
    // reset كل العناصر إلى false
    const newArray = new Array(activeArray.length).fill(false);
    // فعل الكارت الحالي
    newArray[index] = true;
    // حدث الـ state
    setactiveArray(newArray)
  
  }
  const resetActive = () => {
    // reset كل العناصر إلى false
    const newArray = new Array(activeArray.length).fill(false);
    // حدث الـ state
    setactiveArray(newArray)
  }
  
  

  return (
    <div className="mt-16 sm:mt-17 md:mt-21">
      <div className=" dark:text-white   ">
        <div className=" bg-white border-gray-300 dark:border-gray-400 flex items-center gap-4 dark:bg-[#101625] p-4   border-b-1 ">
          <Link
            to="/"
            className="py-1 px-2 hover:bg-gray-100  rounded-lg dark:hover:bg-gray-400 transition-all duration-150">
            <FontAwesomeIcon icon={faArrowLeftLong} />
          </Link>
          <h1 className=" font-semibold   bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent " style={{fontSize:"1.8rem"}}>
            الأذكار
          </h1>
        </div>
      </div>
      <div className="grid grid-cols-1 mt-4 p-4 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {zekrCategories.map(((categorie,index) => (
            <CategoryZekr active={activeArray[index]} index={index} handleActive={handleActive} handleOpen={(n) => {
              setOpenCategory(n)
                
            }} key={categorie.name} name={categorie.name} items={categorie.items} />
      )))}
        </div>
    
      <CategoryZekrDetails
        name={openCategory}
        
        items={openCategory ? data[openCategory] || [] : []}
        onClose={() => {
          setOpenCategory(null) 
          resetActive()
        }
          
        }
      />
     
    </div>
  );
}
