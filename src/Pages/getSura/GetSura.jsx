import { useQuery } from "@tanstack/react-query";
import axios from "axios";


import { useEffect, useState } from "react";
import SuraCard from "../../Components/SuraCard/SuraCard";

export default function GetSura() {
  useEffect(() => {
    document.title = "القرآن الكريم - السور";
  }, []);
  const getMetaSura = () => {
    return axios.get(`https://api.alquran.cloud/v1/surah`);
  };


  const { data, isLoading } = useQuery({
    queryKey: ["getMetaSura"],
    queryFn: getMetaSura,
  });
  const sura = data?.data.data;
  const [suraInfo, setsuraInfo] = useState([]);
 
  let [displaySuraInfo, setdisplaySuraInfo] = useState([]);

  useEffect(() => {
    if (sura) {
      setsuraInfo(sura);
      setdisplaySuraInfo(sura);    
    }
  }, [sura]);
  if (isLoading) {
    <div>
      <span
        style={{ display: "block", margin: "auto" }}
        className="loader"></span>
    </div>;
  }

  function handleChange(e) {
    const value = e.target.value.trim();
    if (value) {
      const lowerVal = value.toLowerCase();
      const numericVal = parseInt(value);
      const filtered = 
        suraInfo.filter(
          (surah) =>
            surah.englishName.toLowerCase().startsWith(lowerVal) ||
            surah.name.replace(/[\u064B-\u065F\u0670\u06D6-\u06ED]/g, '').includes(value) ||
            surah.number === numericVal
        )
      ;
      
      setdisplaySuraInfo(filtered);
    } else {
      setdisplaySuraInfo(suraInfo); // Reset if empty input
    }
    // Debounce effect
  }

  return (
    <div className=" w-full mx-auto px-4 py-7 container mt-24  ">
      <div className="flex flex-col  p-2 justify-between  gap-4" dir="rtl">
        <h1 className="sm:text-3xl md:text-4xl dark:text-white font-bold text-center">
          السور القرآنية
        </h1>
        <div className="relative  my-2">
          <input
            onInput={handleChange}
            autoFocus
            type="text"
            id="searchInpt"
            name="searchInpt"
            autoComplete="off"
            className="bg-gray-50  w-full focus:outline-0  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="ابحث عن السورة أو رقمها"
            required
          />
        </div>
      </div>

      <div className="grid my-5 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 gap-2">
        {displaySuraInfo &&
          displaySuraInfo.map((sura) => (
            <SuraCard key={sura.name} sura={sura}/>
          ))}
      </div>
    </div>
  );
}
