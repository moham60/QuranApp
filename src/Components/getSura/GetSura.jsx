import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Link } from "react-router";

export default function GetSura() {
  useEffect(() => {
    document.title = "القرآن الكريم - السور";
  }, []);
  const getMetaSura = () => {
    return axios.get(`https://api.alquran.cloud/v1/surah`);
  };
  const surahNames = [
    "الفاتحة",
    "البقرة",
    "آل عمران",
    "النساء",
    "المائدة",
    "الأنعام",
    "الأعراف",
    "الأنفال",
    "التوبة",
    "يونس",
    "هود",
    "يوسف",
    "الرعد",
    "إبراهيم",
    "الحجر",
    "النحل",
    "الإسراء",
    "الكهف",
    "مريم",
    "طه",
    "الأنبياء",
    "الحج",
    "المؤمنون",
    "النور",
    "الفرقان",
    "الشعراء",
    "النمل",
    "القصص",
    "العنكبوت",
    "الروم",
    "لقمان",
    "السجدة",
    "الأحزاب",
    "سبأ",
    "فاطر",
    "يس",
    "الصافات",
    "ص",
    "الزمر",
    "غافر",
    "فصلت",
    "الشورى",
    "الزخرف",
    "الدخان",
    "الجاثية",
    "الأحقاف",
    "محمد",
    "الفتح",
    "الحجرات",
    "ق",
    "الذاريات",
    "الطور",
    "النجم",
    "القمر",
    "الرحمن",
    "الواقعة",
    "الحديد",
    "المجادلة",
    "الحشر",
    "الممتحنة",
    "الصف",
    "الجمعة",
    "المنافقون",
    "التغابن",
    "الطلاق",
    "التحريم",
    "الملك",
    "القلم",
    "الحاقة",
    "المعارج",
    "نوح",
    "الجن",
    "المزمل",
    "المدثر",
    "القيامة",
    "الإنسان",
    "المرسلات",
    "النبأ",
    "النازعات",
    "عبس",
    "التكوير",
    "الانفطار",
    "المطففين",
    "الانشقاق",
    "البروج",
    "الطارق",
    "الأعلى",
    "الغاشية",
    "الفجر",
    "البلد",
    "الشمس",
    "الليل",
    "الضحى",
    "الشرح",
    "التين",
    "العلق",
    "القدر",
    "البينة",
    "الزلزلة",
    "العاديات",
    "القارعة",
    "التكاثر",
    "العصر",
    "الهمزة",
    "الفيل",
    "قريش",
    "الماعون",
    "الكوثر",
    "الكافرون",
    "النصر",
    "المسد",
    "الإخلاص",
    "الفلق",
    "الناس",
  ];

  const { data, isLoading } = useQuery({
    queryKey: ["getMetaSura"],
    queryFn: getMetaSura,
  });
  const sura = data?.data.data;
  const [suraInfo, setsuraInfo] = useState([]);
  let sortedsuraInfo = [];

  console.log(suraInfo);
  useEffect(() => {
    if (sura) {
      setsuraInfo(sura);
      sura.map((ele) => {
        sortedsuraInfo.push({
          number: ele.number,
          englishName: ele.englishName,
          name: ele.name,
        });
        return ele;
      });
      sura.map((ele, index) =>
        surahNames.map((name, indx) => {
          if (index == indx) {
            ele.name = name;
            sortedsuraInfo.push(name);
          }
        })
      );
      console.log("sortedInfo", sortedsuraInfo);
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
    console.log(value);

    if (value) {
      const lowerVal = value.toLowerCase();
      const numericVal = parseInt(value);
      const filtered = structuredClone(
        suraInfo.filter(
          (surah) =>
            surah.englishName.toLowerCase().startsWith(lowerVal) ||
            surah.name.includes(value) ||
            surah.number === numericVal
        )
      );
      console.log(filtered);
      setsuraInfo(filtered);
    } else {
      setsuraInfo(sura); // Reset if empty input
    }
    // Debounce effect
  }

  return (
    <div className=" w-full mx-auto px-4 py-7 container mt-24  ">
      
      <div className="flex flex-col  p-2 justify-between  gap-4" dir="rtl">
        <h1 className="text-2xl dark:text-white font-bold text-center">
          السور القرآنية
        </h1>
        <div className="  relative  my-2">
          <input
            onChange={handleChange}
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
        {suraInfo &&
          suraInfo.map((sura) => (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.2 }} // Smooth transition
              key={sura.name}>
              <Link
                to={`/sura/${sura.number}`}
                className="hover:bg-[#E9F4FA] bg-gradient-to-r from-emerald-500/10 to-blue-500/10 text-black  dark:text-white dark:hover:bg-emerald-500/5 hover:cursor-pointer  shadow p-4 rounded flex items-center  group transition-all duration-750 ">
                <div className="flex items-center w-full justify-between">
                  <span className="bg-gradient-to-br from-emerald-500 to-blue-500   group-hover:scale-110 transition-all duration-700 rounded-lg text-white py-2 px-4">
                    {sura.number}
                  </span>
                  <div className="my-2">
                    <div className="my-2">
                      <p>{sura.name}</p>
                      <p>{sura.englishName}</p>
                    </div>
                  </div>
                  <div>
                    {sura.revelationType === "Meccan" ? (
                      <p className="text-emerald-300  text-center p-2 bg-emerald-700 rounded-2xl">
                        {sura.revelationType}
                      </p>
                    ) : (
                      <p className="text-blue-800 text-center p-2 bg-blue-300 rounded-2xl">
                        {sura.revelationType}
                      </p>
                    )}

                    <p>{sura.numberOfAyahs}verses</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
      </div>
    </div>
  );
}
