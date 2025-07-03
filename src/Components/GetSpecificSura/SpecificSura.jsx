import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link, useLocation, useParams } from "react-router";
import { motion} from "motion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeftLong,
  faClose,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import {  useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  addAyahToBookmark,
  deleteAyahFromBookMark,
  getCurrentSurasForSpecificReciter,
  getspecificAyah,
  playPause,
  setNameOfSura,
  setNumofSura,
} from "../../redux/feature/Quran";

import Player from "../QuranPlayer";
import { message } from "react-message-popup";



export default function SpecificSura() {
  const { number } = useParams();
  const [openModelReciters, setopenModelReciters] = useState(false);
  const [nameReciter, setnameReciter] = useState("إبراهيم الأخضر");
  const [allReciters, setallReciters] = useState(null);
  const [copyNameReciters, setcopyNameReciters] = useState(null);
  const [displayedRecent, setdisplayedRecent] = useState(false);
  const { isplaying } = useSelector((state) => state.Quran);
  const [audioUrls, setaudioUrls] = useState(null);
  const [numofSura, setnumofSura] = useState(null);
  const verseInpt = useRef(null);
  const [modelOfSuraData, setmodelOfSuraData] = useState(false);
  const [openModelTafsir, setopenModelTafsir] = useState(false);
  const [Tafsir, setTafsir] = useState({
    tafsirId: 1,
    tafsirName: "تفسير السعدي",
  });
  const tafsirButtonList = useRef(null);
  const [isTafsirButtonEnabled, setIsTafsirButtonEnabled] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const [displayTafsir, setdisplayTafsir] = useState(
    new Array(286).fill(false)
  );
  const [textFormMoshef, settextFormMoshef] = useState(false);
  const Tafsirs = [
    { id: "1", arabic: "التفسير الميسر", english: "Al-Tafsir Al-Muyassar" },
    { id: "2", arabic: "تفسير الجلالين", english: "Tafsir Al-Jalalayn" },
    { id: "3", arabic: "تفسير السعدي", english: "Tafsir Al-Saadi" },
    { id: "4", arabic: "تفسير ابن كثير", english: "Tafsir Ibn Kathir" },
    {
      id: "5",
      arabic: "تفسير الوسيط لطنطاوي",
      english: "Tafsir Al-Waseet by Tantawi",
    },
    { id: "6", arabic: "تفسير البغوي", english: "Tafsir Al-Baghawi" },
    { id: "7", arabic: "تفسير القرطبي", english: "Tafsir Al-Qurtubi" },
    { id: "8", arabic: "تفسير الطبري", english: "Tafsir Al-Tabari" },
  ];
  const dispatch = useDispatch();
  const { data, isLoading } = useQuery({
    queryKey: ["sura", number],
    queryFn: getSpecificSura,
  });
  const ayat = data?.data.data.ayahs;
  const metaData = data?.data.data;
  const [isLoadingServer, setisLoadingServer] = useState(false);
  useEffect(() => {
    getAllReciters();
    
  }, []);
 
  useEffect(() => {
    changeFormatNumberToCanGotoserver();
   
  }, [number]);
  useEffect(() => {
    if (metaData?.name) {
      dispatch(setNumofSura(number));
      dispatch(setNameOfSura(metaData.name))
    }
   
  },[metaData,number])
 
  const location = useLocation();
  const scrollToAyah = location.state?.scrollToAyah;
  useEffect(() => {
    if (scrollToAyah) {
      console.log("scroll ayah",scrollToAyah)
      dispatch(getspecificAyah(scrollToAyah))
    }
  },[])
  const handleModelRecitersOpen = () => {
    setopenModelReciters(true);
  };
  const openMetaDataOfSura = () => {
    setmodelOfSuraData(true);
  };
  const handleModelRecitersClose = () => {
    setopenModelReciters(false);
  };
  const handleChangeInpt = (value) => {
    if (value && copyNameReciters) {
      setcopyNameReciters(
        copyNameReciters.filter((ele) => ele.name.includes(value))
      );
    } else {
      setcopyNameReciters(allReciters);
    }
  };
  
  function changeFormatNumberToCanGotoserver() {
    if (number < 10) {
      setnumofSura("00" + number);
      console.log(numofSura);
    } else if (number == 10 || (number > 10 && number < 100)) {
      setnumofSura("0" + number);
    } else {
      setnumofSura(number);
    }
  }
  function getAllReciters() {
    return axios
      .get(
        `https://mp3quran.net/api/v3/reciters`
      )
      .then((res) => {
        console.log(res);
        setallReciters(res.data.reciters);
        setcopyNameReciters(res.data.reciters);
      })
      .catch((res) => {
        console.log(res);
      });
  }
  function getRecentReciters() {
    axios
      .get(`https://mp3quran.net/api/v3/recent_reads`)
      .then((res) => {
        console.log(res);
        setcopyNameReciters(res.data.reads);
      })
      .catch((res) => {
        console.log(res);
      });
  }
 
  function getServerOfsura(receiterId = 1) {
    setisLoadingServer(true);
    axios
      .get(
        `https://www.mp3quran.net/api/v3/reciters?language=ar&reciter=${receiterId}`
      )
      .then((res) => {
        console.log("res:", res);
        setaudioUrls(res.data.reciters[0].moshaf[0].server);
        dispatch(
          getCurrentSurasForSpecificReciter(
            res.data.reciters[0].moshaf[0].server
          )
        );
        setisLoadingServer(false);
      })
      .catch((res) => {
        setisLoadingServer(false);
        console.log(res);
      });
  }

  function getSpecificSura() {
    return axios.get(`https://api.alquran.cloud/v1/surah/${number}`);
  }
  



  function changeTafsir(tafsirId, tafsirName) {
    setTafsir({ tafsirId, tafsirName });
  }
  const [tafsirText, settafsirText] = useState(null);
  function getTextTafsir(ayahNumber) {
    axios
      .get(
        `http://api.quran-tafseer.com/tafseer/${Tafsir.tafsirId}/${number}/${ayahNumber}`
      )
      .then((res) => {
        console.log("res", res);
        console.log("tafsirText", res.data.text);
        console.log(ayahNumber);
        settafsirText(res.data.text);
      })
      .catch((res) => {
        console.log(res);
      });
  }
  function changeTasirBolean(index) {
    const newDisplayTafsir = [...displayTafsir];
    newDisplayTafsir[index] = !newDisplayTafsir[index];
    setdisplayTafsir(newDisplayTafsir);
  }
  
  function handleBookMark(ayah) {
    const arr = JSON.parse(localStorage.getItem("BookMarkAyat"));
    
    if (arr.length == 0) {
      dispatch(addAyahToBookmark(ayah));
      message.success("تم اضافة الأيه الي العلامات المرجعية", 2000);
    }
    else {
      var res = false;
      arr.map((el) => {
        if (el.numberInSurah === ayah.numberInSurah &&el.page===ayah.page) {
          dispatch(deleteAyahFromBookMark(ayah));
          message.success("تم حذف الأيه من العلامات المرجعية", 2000);
          console.log("deleted");
          res = true;
        } 
      });
      if (res === false) {
        dispatch(addAyahToBookmark(ayah));
       
        message.success("تم اضافة الأيه الي العلامات المرجعية", 2000);
      }
    }
   
  }
 

  function ayahInBookMarkOrNot(ayah) {
    const currentBookmarkAyat =
      JSON.parse(localStorage.getItem("BookMarkAyat")) || [];
    return currentBookmarkAyat.some(
      (el) => el.numberInSurah === ayah.numberInSurah&&el.page===ayah.page);
  }
 
  console.log("metaData", metaData);
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[100vh]">
        <span
          style={{ display: "block", margin: "auto" }}
          className="loader"></span>
      </div>
    );
  }

  console.log(ayat);
  return (
    <div className=" w-full h-screen  relative ">
      {data && (
        <div className="border-gray-600     z-20 fixed    w-full left-0 right-0 bg-white dark:bg-[#111827] specificInfoSura  p-0 sm:p-1 md:p-2  sm:top-15 md:top-17       border-b-1 ">
          <div className="flex  items-center dark:text-white    my-1 gap-5">
            <Link
              to="/"
              className="py-1 px-2  rounded-lg hover:bg-gray-400 transition-all duration-150">
              <FontAwesomeIcon icon={faArrowLeftLong} />
            </Link>
            <div>
              <p className="font-bold">{metaData.englishName}</p>
              <p className="text-gray-500">
                {metaData.name} <span>({metaData.englishName})</span>
              </p>
            </div>
          </div>
          <div className="flex flex-col    md:flex-row  dark:text-white pb-5  gap-4">
            <div className="flex w-full text-sm  left gap-2 ">
              <button
                onClick={() => settextFormMoshef(!textFormMoshef)}
                className="hover:bg-gray-100 hover:cursor-pointer dark:hover:bg-gray-800 rounded p-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="lucide lucide-book-open  h-4 w-4 sm:h-5 sm:w-5">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                </svg>
              </button>

              <button
                onClick={() => {
                  setIsTafsirButtonEnabled(!isTafsirButtonEnabled);
                  tafsirButtonList.current.classList.toggle(
                    "cursor-not-allowed"
                  );

                  tafsirButtonList.current.classList.toggle("text-white");
                  tafsirButtonList.current.classList.toggle("cursor-pointer");
                }}
                className={
                  isTafsirButtonEnabled
                    ? "text-[#17715C] book flex cursor-pointer rounded p-1 hover:bg-gray-100 dark:hover:bg-gray-800   items-center gap-2"
                    : "flex cursor-pointer rounded p-1 hover:bg-gray-100 dark:hover:bg-gray-800   items-center gap-2"
                }>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="lucide lucide-book h-4 w-4 sm:h-5 sm:w-5 ">
                  <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
                </svg>
              </button>
              <button
                onClick={() => {
                  if (isTafsirButtonEnabled) {
                    setopenModelTafsir(true);
                  }
                }}
                ref={tafsirButtonList}
                disabled={!isTafsirButtonEnabled}
                className={" cursor-not-allowed      text-gray-500"}>
                <span>{Tafsir.tafsirName}</span>
              </button>
              <button
                onClick={handleModelRecitersOpen}
                className="flex hover:cursor-pointer   items-center gap-1 sm:gap-2 p-1 sm:p-1.5 lg:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 
                  w-auto md:w-full
                  "
                aria-label="Select reciter">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="lucide lucide-volume2 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                </svg>
                <span className="text-[10px] sm:text-xs lg:text-sm text-gray-600 dark:text-gray-400 truncate font-amiri tracking-wide">
                  {nameReciter}
                </span>
              </button>
            </div>
            <div className="right   flex items-center">
              <button
                onClick={openMetaDataOfSura}
                className="p-1 metadataOfSura hover:cursor-pointer sm:p-1.5 lg:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label="Show surah info">
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
                  className="lucide lucide-info h-4 w-4 sm:h-5 sm:w-5">
                  <circle cx={12} cy={12} r={10} />
                  <path d="M12 16v-4" />
                  <path d="M12 8h.01" />
                </svg>
              </button>

              <button
                onClick={() => {
                  getServerOfsura();
                  dispatch(playPause(!isplaying));
                  setShowPlayer(true);
                }}
                className="p-1 hover:cursor-pointer sm:p-1.5 lg:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 "
                aria-label="Play full surah">
                {isplaying ? (
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
                    className="lucide lucide-pause h-6 w-6 text-emerald-400">
                    <rect width={4} height={16} x={6} y={4} />
                    <rect width={4} height={16} x={14} y={4} />
                  </svg>
                ) : (
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
                    className="lucide  cursor-pointer lucide-play h-4 w-4 sm:h-5 sm:w-5">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                )}
              </button>
              <div className="flex p-2  items-center gap-1 sm:gap-2">
                {number === "1" ? (
                  <Link to={`/sura/114`}>
                    <button
                      className="p-1 hover:cursor-pointer sm:p-1.5 lg:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                      aria-label="Previous surah">
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
                        className="lucide lucide-skip-back h-4 w-4 sm:h-5 sm:w-5">
                        <polygon points="19 20 9 12 19 4 19 20" />
                        <line x1={5} x2={5} y1={19} y2={5} />
                      </svg>
                    </button>
                  </Link>
                ) : (
                  <Link to={`/sura/${Number(number) - 1}`}>
                    <button
                      className="p-1 hover:cursor-pointer sm:p-1.5 lg:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                      aria-label="Previous surah">
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
                        className="lucide lucide-skip-back h-4 w-4 sm:h-5 sm:w-5">
                        <polygon points="19 20 9 12 19 4 19 20" />
                        <line x1={5} x2={5} y1={19} y2={5} />
                      </svg>
                    </button>
                  </Link>
                )}

                {number === "114" ? (
                  <Link to={`/sura/1`}>
                    <button
                      className="p-1 hover:cursor-pointer sm:p-1.5 lg:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                      aria-label="Next surah">
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
                        className="lucide lucide-skip-forward h-4 w-4 sm:h-5 sm:w-5">
                        <polygon points="5 4 15 12 5 20 5 4" />
                        <line x1={19} x2={19} y1={5} y2={19} />
                      </svg>
                    </button>
                  </Link>
                ) : (
                  <Link to={`/sura/${Number(number) + 1}`}>
                    <button
                      className="p-1 hover:cursor-pointer sm:p-1.5 lg:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                      aria-label="Next surah">
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
                        className="lucide lucide-skip-forward h-4 w-4 sm:h-5 sm:w-5">
                        <polygon points="5 4 15 12 5 20 5 4" />
                        <line x1={19} x2={19} y1={5} y2={19} />
                      </svg>
                    </button>
                  </Link>
                )}
              </div>
              <div className="relative w-[60px]  ">
                <button
                  onClick={() =>
                    dispatch(getspecificAyah(verseInpt.current.value))
                  }
                  className=" absolute right-0 top-[50%] left-[50%] translate-y-[-50%] hover:cursor-pointer hover:text-gray-400">
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
                    className="lucide lucide-arrow-up-circle w-4 h-4">
                    <circle cx={12} cy={12} r={10} />
                    <path d="m16 12-4-4-4 4" />
                    <path d="M12 16V8" />
                  </svg>
                </button>
                <input
                  ref={verseInpt}
                  className="dark:bg-gray-800 border  verseSearch w-[100%] rounded-xl p-2 "
                  required
                  autoComplete="off"
                  placeholder="Verse"
                  type="text"
                  name="verse"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <div
        dir={textFormMoshef ? "rtl" : "ltr"}
        className={
          textFormMoshef
            ? `container mt-20 flex flex-wrap gap-4 justify-center items-center  mx-auto  px-2 py-30 text-center`
            : "container mt-24 sm:mt-22 py-30 mx-auto "
        }>
        {textFormMoshef
          ? ayat &&
            ayat.map((ayah) => (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.2 }}
                key={ayah.number}
                data-ayah={ayah.numberInSurah}
                dir="rtl"
                className="ayah    rounded transition-all duration-500   text-black p-5 my-4  dark:text-white shadow items-center ">
                <div className="ayah flex items-center gap-2">
                  <p className="text-2xl">{ayah.text}</p>
                  <div className="icons flex flex-col  items-center gap-2">
                    <span className="bg-gradient-to-br  from-emerald-500 to-blue-500 rounded-lg text-white py-2 px-3">
                      {ayah.numberInSurah}
                    </span>
                    {ayahInBookMarkOrNot(ayah) ? (
                      <button
                        onClick={() => {
                          handleBookMark(ayah);
                        }}
                        className="p-1.5 cursor-pointer rounded-full transition-all duration-300 transform hover:scale-110 bg-emerald-100 dark:bg-emerald-900/30 shadow-lg shadow-emerald-500/20"
                        title="Remove bookmark">
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
                          className="lucide lucide-bookmark-check w-5 h-5 sm:w-6 sm:h-6 text-emerald-500 transform transition-transform duration-300 hover:scale-110">
                          <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2Z" />
                          <path d="m9 10 2 2 4-4" />
                        </svg>
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          handleBookMark(ayah);
                        }}
                        title="Add bookmark"
                        className="hover:cursor-pointer">
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
                          className={`lucide lucide-bookmark w-5 h-5 sm:w-6 sm:h-6  hover:text-emerald-500 dark:hover:text-emerald-400 transform transition-transform duration-300 hover:rotate-12 dark:text-gray-500`}>
                          <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          : ayat &&
            ayat.map((ayah, index) => (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.2 }}
                key={ayah.number}
                data-ayah={ayah.numberInSurah}
                className="ayah relative my-2    w-full hover:bg-[#e0dbdb60] rounded transition-all duration-500   text-black p-5   dark:text-white shadow items-center ">
                <div className="left flex items-center gap-5">
                  <span className="bg-gradient-to-br from-emerald-500 to-blue-500 rounded-lg text-white py-2 px-3">
                    {ayah.numberInSurah}
                  </span>
                  <div className="text-gray-400 font-bold">
                    <ul className="  flex items-center gap-2">
                      <li className="flex items-center gap-2">
                        {" "}
                        جزء {ayah.juz}
                        <span>•</span>
                      </li>
                      <li className="flex items-center gap-2">
                        حزب {ayah.hizbQuarter} <span>•</span>
                      </li>
                      <li className="flex items-center gap-2">
                        ربع {ayah.hizbQuarter}
                        <span>•</span>
                      </li>
                      <li className="flex items-center gap-2">
                        صفحة {ayah.page}
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="flex gap-3 p-6 items-center justify-between">
                  {ayahInBookMarkOrNot(ayah) ? (
                    <button
                      onClick={() => {
                        handleBookMark(ayah);
                      }}
                      className="p-1.5 cursor-pointer rounded-full transition-all duration-300 transform hover:scale-110 bg-emerald-100 dark:bg-emerald-900/30 shadow-lg shadow-emerald-500/20"
                      title="Remove bookmark">
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
                        className="lucide lucide-bookmark-check w-5 h-5 sm:w-6 sm:h-6 text-emerald-500 transform transition-transform duration-300 hover:scale-110">
                        <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2Z" />
                        <path d="m9 10 2 2 4-4" />
                      </svg>
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        handleBookMark(ayah);
                      }}
                      title="Add bookmark"
                      className="hover:cursor-pointer">
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
                        className={`lucide lucide-bookmark w-5 h-5 sm:w-6 sm:h-6  hover:text-emerald-500 dark:hover:text-emerald-400 transform transition-transform duration-300 hover:rotate-12 dark:text-gray-500`}>
                        <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
                      </svg>
                    </button>
                  )}

                  <div className="text  " dir="rtl">
                    <p className="text-sm md:text-4xl font-bold ">
                      {ayah.text}
                    </p>
                  </div>
                </div>
                {isTafsirButtonEnabled ? (
                  <div key={ayah.numberInSurah}>
                    <button
                      // eslint-disable-next-line react/no-unknown-property
                      id={ayah.numberInSurah}
                      onClick={(e) => {
                        const index = e.target.id - 1;
                        changeTasirBolean(index);
                        console.log("displayArray", displayTafsir);
                        getTextTafsir(ayah.numberInSurah);
                      }}
                      className="text-emerald-400  cursor-pointer">
                      {displayTafsir[ayah.numberInSurah - 1] == false
                        ? "عرض التفسير"
                        : "اخفاء التفسير "}
                    </button>
                    {displayTafsir[index] ? (
                      <div className="text-gray-500 text-sm mt-2" dir="rtl">
                        {tafsirText && (
                          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                            <p className="text-2xl">{Tafsir.tafsirName}</p>

                            <p className="text-gray-400 text-sm mt-2">
                              {tafsirText}
                            </p>
                          </div>
                        )}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                ) : (
                  ""
                )}
              </motion.div>
            ))}
      </div>
      {openModelReciters && (
        <div className=" dark:bg-[#0807075d]   absolute modelofReciters left-0 right-0 top-0 bottom-0  ">
          <div className="fixed  dark:text-white   rounded z-50 w-[450px] bg-white shadow-lg  dark:bg-[#111827]  left-[50%] top-[50%]  transform translate-[-50%]">
            <button
              onClick={handleModelRecitersClose}
              className="absolute right-[10px] hover:cursor-pointer top-[20px]">
              <FontAwesomeIcon
                icon={faClose}
                className="text-gray-500 hover:text-gray-400"
                style={{ fontSize: "22px" }}
              />
            </button>

            <h2
              className="my-4 p-3 text-2xl font-bold "
              style={{ borderBottom: "1px solid gray" }}>
              Select Reciters
            </h2>

            <>
              <div className="flex displayedRecent border-b dark:border-gray-700">
                {displayedRecent ? (
                  <>
                    <button
                      onClick={() => {
                        setcopyNameReciters(allReciters);
                        setdisplayedRecent(false);
                      }}
                      className={
                        "flex-1 py-2 px-4 text-white border-0 text-sm font-medium  cursor-pointer"
                      }>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={16}
                        height={16}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-user-round inline mr-2">
                        <circle cx={12} cy={8} r={5} />
                        <path d="M20 21a8 8 0 0 0-16 0" />
                      </svg>
                      All Reciters
                    </button>
                    <button
                      onClick={() => {
                        getRecentReciters();
                        setdisplayedRecent(true);
                      }}
                      className={
                        "flex-1 py-2 px-4 text-sm font-medium   cursor-pointer text-blue-700 border-b-1"
                      }>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={16}
                        height={16}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-history inline mr-2">
                        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                        <path d="M3 3v5h5" />
                        <path d="M12 7v5l4 2" />
                      </svg>
                      Recent
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setcopyNameReciters(allReciters);
                        setdisplayedRecent(false);
                      }}
                      className={
                        "flex-1 py-2 px-4 text-sm font-medium  cursor-pointer text-blue-700 border-b-1"
                      }>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={16}
                        height={16}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-user-round inline mr-2">
                        <circle cx={12} cy={8} r={5} />
                        <path d="M20 21a8 8 0 0 0-16 0" />
                      </svg>
                      All Reciters
                    </button>
                    <button
                      onClick={() => {
                        getRecentReciters();
                        setdisplayedRecent(true);
                      }}
                      className={
                        "flex-1 py-2 px-4 text-white border-0 text-sm font-medium  cursor-pointer"
                      }>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={16}
                        height={16}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-history inline mr-2">
                        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                        <path d="M3 3v5h5" />
                        <path d="M12 7v5l4 2" />
                      </svg>
                      Recent
                    </button>
                  </>
                )}
              </div>

              <div className="relative searchReciterNameInModel  p-4 w-full">
                <input
                  onInput={(e) => handleChangeInpt(e.target.value)}
                  type="text"
                  id="simple-search"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="ابحث عن اسم القارئ"
                  required
                />

                <FontAwesomeIcon
                  icon={faSearch}
                  className="absolute left-[25px] top-[50%] transform translate-y-[-50%]"
                />
              </div>
              <div className=" max-h-[250px] ModelNamesReciters   overflow-auto  ">
                {copyNameReciters &&
                  copyNameReciters.map((ele) => (
                    <div key={ele.id}>
                      {ele.name === nameReciter ? (
                        <button
                          onClick={() => {
                            setnameReciter(ele.name);
                            handleModelRecitersClose();
                            getServerOfsura(ele.id);
                            setShowPlayer(true);
                            dispatch(playPause(true));
                          }}
                          style={{ borderBlock: "2px solid gray" }}
                          className="flex gap-2 items-center bg-gray-700 hover:cursor-pointer  transition-all duration-150 w-full p-2   my-4">
                          <span
                            style={{ borderRadius: "50%" }}
                            className=" w-[35px] h-[35px] bg-blue-700 flex items-center justify-center  text-white">
                            {ele.name.split("", 1).join()}
                          </span>
                          <div>
                            <p>{ele.name}</p>
                            <p className="text-gray-500">
                              {ele.moshaf[0].name}
                            </p>
                          </div>
                        </button>
                      ) : (
                        <button
                          name={ele.name}
                          onClick={() => {
                            setnameReciter(ele.name);
                            handleModelRecitersClose();
                            getServerOfsura(ele.id);
                            dispatch(playPause(true));
                            setShowPlayer(true);
                          }}
                          style={{ borderBlock: "2px solid gray" }}
                          className="flex gap-2 items-center hover:bg-gray-800 hover:cursor-pointer  transition-all duration-150 w-full p-2   my-4">
                          <span
                            style={{ borderRadius: "50%" }}
                            className=" w-[35px] h-[35px] bg-blue-700 flex items-center justify-center  text-white">
                            {ele.letter}
                          </span>
                          <div>
                            <p>{ele.name}</p>
                            <p className="text-gray-500">
                              {ele.moshaf[0].name}
                            </p>
                          </div>
                        </button>
                      )}
                    </div>
                  ))}
              </div>
            </>
          </div>
        </div>
      )}
      {openModelTafsir && (
        <div className=" ModelTafsir absolute TafsirModel  inset-0 ">
          <div className="fixed  dark:text-white   rounded z-50 w-[450px]  dark:bg-gray-800 bg-white  left-[50%] top-[50%]  transform translate-[-50%]">
            <button
              onClick={() => setopenModelTafsir(false)}
              className="absolute closeTafsirModel right-[10px] hover:cursor-pointer top-[20px]">
              <FontAwesomeIcon
                icon={faClose}
                className="text-gray-500 hover:text-gray-400"
                style={{ fontSize: "22px" }}
              />
            </button>

            <h2
              className="my-4 p-3 text-2xl font-bold "
              style={{ borderBottom: "1px solid gray" }}>
              أختر التفسير
            </h2>

            <div className=" max-h-[450px] px-2 rounded-2xl   overflow-auto">
              {Tafsirs.map((ele) => (
                <div
                  onClick={() => {
                    changeTafsir(ele.id, ele.arabic);
                    setopenModelTafsir(false);
                  }}
                  key={ele.id}
                  className={
                    ele.arabic == Tafsir.tafsirName
                      ? "my-2 bg-[#0e550e3f] cursor-pointer  rounded p-2   hover:bg-transparent"
                      : "my-2  rounded p-2 cursor-pointer  dark:hover:bg-gray-800   "
                  }
                  dir="rtl">
                  <div className="flex justify-between items-center">
                    <div className=" text-3xl">
                      <p>{ele.arabic}</p>
                      <p className="dark:text-gray-500">
                        {ele.arabic.includes("التفسير")
                          ? ele.arabic.split("التفسير")
                          : ele.arabic.split("تفسير")}
                      </p>
                    </div>
                    <p className="dark:text-gray-500">{ele.english}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {showPlayer ? (
        <>
          <div className=" fixed z-30 bg-white   p-3 bottom-0 left-0 right-0 dark:bg-gray-900 shadow-2xl">
            <Player
              numofSura={numofSura}
              activeSura={audioUrls}
              isLoading={isLoadingServer}
              setShowPlayer={setShowPlayer}
            />
          </div>
        </>
      ) : (
        ""
      )}
      {modelOfSuraData ? (
        <div className="modelMetaDataOfSura fixed h-screen  inset-0 bg-gray-400/10  z-50 flex items-center justify-center     ">
          <div className="model  dark:bg-gray-800 rounded-2xl w-[90%] sm:w-[80%] md:w-[60%] lg:w-[50%] max-h-[85vh]  overflow-auto  bg-white">
            <div className=" relative  border-b p-4 gap-2 border-gray-400 flex items-center  ">
              <h2 className="text-2xl dark:text-white">{metaData.name}</h2>
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
                <p className="dark:text-gray-500 my-1 text-gray-400">الصفحات</p>
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
    </div>
  );
}
