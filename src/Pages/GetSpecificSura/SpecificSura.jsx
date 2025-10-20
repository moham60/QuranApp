import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link, useLocation, useParams } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeftLong,
  faClose,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import {   useEffect, useRef, useState } from "react";

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

import Player from "../../Components/QuranPlayer";
import { message } from "react-message-popup";
import Spinner from "../../Components/Spinner/Spinner";

import ModelReciter from './../../Components/Models/ModelReciters/ModelReciter';
import SuraModel from "../../Components/Models/SuraModel/SuraModel";
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
  const [openModelTafsir, setopenModelTafsir] = useState(false);
  const [receiterId, setreceiterId] = useState(1);
  const tafsirButtonList = useRef(null);
  const [isTafsirButtonEnabled, setIsTafsirButtonEnabled] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const [displayTafsir, setdisplayTafsir] = useState(
    new Array(286).fill(false)
  );
  const [textFormMoshef, settextFormMoshef] = useState(false);
  const dispatch = useDispatch();
  const { data,isLoading } = useQuery({
    queryKey: ["sura", number],
    queryFn: getSpecificSura,
  });
  const ayat = data?.data.data.ayahs;
  const metaData = data?.data.data;
     const [modelOfSuraData, setmodelOfSuraData] = useState(false);
  const [isLoadingServer, setisLoadingServer] = useState(false);
  useEffect(() => {
    getAllReciters();
    
  },[]);
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
    useEffect(() => {
      if (location) {
        const scroll = location?.state?.scrollToAyah;
        if (scroll) {
              dispatch(getspecificAyah(scroll));
        }
      }
    }, [location])
  //remove playEvent When close The page
  useEffect(() => {
    return () => {
      dispatch(playPause(false));
    }
  },[])
  const handleModelRecitersOpen = () => {
    setopenModelReciters(true);
  };
 
  const handleModelRecitersClose = () => {
    setopenModelReciters(false);
  };
  const handleChangeInpt = (value) => {
    if (value) {
      setcopyNameReciters(
        allReciters.filter((ele) => ele.name.includes(value))
      );
    } else {
      setcopyNameReciters(allReciters);
    }
  };
  
  function changeFormatNumberToCanGotoserver() {
    if (number < 10) {
      setnumofSura("00" + number);
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
        setallReciters(res.data.reciters);
        setcopyNameReciters(res.data.reciters);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function getRecentReciters() {
    axios
      .get(`https://mp3quran.net/api/v3/recent_reads`)
      .then((res) => {
        setcopyNameReciters(res.data.reads);
      })
      .catch((err) => {
        console.log(err);
      });
  }
 
  function getServerOfsura(receiterId = 1) {
    setisLoadingServer(true);
    axios
      .get(
        `https://www.mp3quran.net/api/v3/reciters?language=ar&reciter=${receiterId}`
      )
      .then((res) => {
        
        setaudioUrls(res.data.reciters[0].moshaf[0].server);
        dispatch(
          getCurrentSurasForSpecificReciter(
            res.data.reciters[0].moshaf[0].server
          )
        );
        setisLoadingServer(false);
      })
      .catch((err) => {
        setisLoadingServer(false);
        console.log(err);
      });
  }

  function getSpecificSura() {
    return axios.get(`https://api.alquran.cloud/v1/surah/${number}`);
  }
  
  const [Tafsir, setTafsir] = useState({
    tafsirId: 170,
    tafsirName: "تفسير السعدي",
    slug: "ar-tafseer-al-saddi",
  });
  function changeTafsir(tafsirId, tafsirName,slug) {
    setTafsir({ tafsirId, tafsirName,slug });
  }
  const [tafsirText, setTafsirText] = useState(null);

  const Tafsirs = [
    {
      id: "1",
      arabic: "التفسير الميسر",
      english: "Al-Tafsir Al-Muyassar",
      slug: "ar-tafsir-muyassar",
    },
    
    {
      id: "170",
      arabic: "تفسير السعدي",
      english: "Al-Saadi",
      slug: "ar-tafseer-al-saddi",
    },
    {
      id: "171",
      arabic: "تفسير ابن كثير",
      english: "Ibn Kathir",
      slug: "ar-tafsir-ibn-kathir",
    },
    {
      id: "173",
      arabic: "تفسير البغوي",
      english: "Tafsir Al-Baghawi",
      slug: "ar-tafsir-al-baghawi",
    },
    {
      id: "174",
      arabic: "تفسير القرطبي",
      english: "Tafsir Al-Qurtubi",
      slug: "ar-tafseer-al-qurtubi",
    },
    {
      id: "175",
      arabic: "تفسير الطبري",
      english: "Tafsir Al-Tabari",
      slug: "ar-tafsir-al-tabari",
    },
  ];
  const [loadingTafsir, setloadingTafsir] = useState(false);
  async function getAyahTafsir(ayahNumber, slug) {
    
    try {
      const response = await fetch(
        `https://cdn.jsdelivr.net/gh/spa5k/tafsir_api@main/tafsir/${slug}/${number}.json`
      );
      if (!response.ok) throw new Error("Failed to fetch Tafsir");
      const data = await response.json();
      const ayah = data.ayahs.find((aya) => aya.ayah === ayahNumber);
      setloadingTafsir(true);
      if (data) {
        setloadingTafsir(false);
      }
      if (ayah) {
        setTafsirText(ayah.text);
      } else {
        setTafsirText("لم يتم العثور على تفسير لهذه الآية.");
      }
      
    } catch (error) {
      setloadingTafsir(false);
      console.log(error);
      return "حدث خطأ أثناء تحميل التفسير.";

    }
   
  }
  
  function changeTasirBolean(index) {
    const newDisplayTafsir = [...displayTafsir];
    newDisplayTafsir[index] = !newDisplayTafsir[index];
    setdisplayTafsir(newDisplayTafsir);
  }
  
  function handleBookMark(ayah) {
    const arr = JSON.parse(localStorage.getItem("BookMarkAyat"))||[];
    
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
 

  if (isLoading) {
    return <Spinner/>
  }
  return (
    <>
      
        
          <div className=" w-full  relative ">
            {data && (
              <div className="border-gray-600 specific  top-[95px] pt-1 sm:top-16 md:top-[75px]     z-20 fixed    w-full left-0 right-0 bg-white dark:bg-[#111827]            border-b-1 ">
                <div className="flex  items-center dark:text-white    my-1 gap-5">
                  <Link
                    to="/"
                    className="py-1 px-2  rounded-lg hover:bg-gray-400 transition-all duration-150">
                    <FontAwesomeIcon icon={faArrowLeftLong} />
                  </Link>
                  <div>
                    <p className="font-bold mt-1">{metaData.englishName}</p>
                    <p className="text-gray-500 ">
                      {metaData.name.replace(
                        /[\u0617-\u061A\u064B-\u0652]/g,
                        ""
                      )}{" "}
                      <span>({metaData.englishName})</span>
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

                        tafsirButtonList.current.classList.toggle(
                          "cursor-pointer"
                        );
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
                      className={
                        " cursor-not-allowed  w-[20%] sm:w-[10%]    text-gray-400"
                      }>
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
                      onClick={()=>setmodelOfSuraData(true)}
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
                        getServerOfsura(receiterId);
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
                  ? `mt-24 flex flex-wrap gap-4 justify-center items-center  mx-auto  py-34 text-center`
                  : "container mt-28 px-4 sm:mt-22 py-30 mx-auto "
              }>
              {textFormMoshef
                ? ayat &&
                  ayat.map((ayah) => (
                    <div
                      key={ayah.number}
                      data-ayah={ayah.numberInSurah}
                      dir="rtl"
                      className="ayah    rounded transition-all duration-500   text-black p-2 my-5  dark:text-white shadow items-center ">
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
                    </div>
                  ))
                : ayat &&
                  ayat.map((ayah, index) => (
                    <div
                      key={ayah.number}
                      data-ayah={ayah.numberInSurah}
                      className="ayah relative my-6    w-full hover:bg-[#e0dbdb60] rounded transition-all duration-500   text-black px-2 py-5   dark:text-white shadow items-center ">
                      <div className="left flex items-center gap-5">
                        <span className="bg-gradient-to-br from-emerald-500 to-blue-500 rounded-lg text-white py-2 px-3">
                          {ayah.numberInSurah}
                        </span>
                        <div className="text-gray-500 list   font-bold">
                          <ul className="  flex  items-center gap-2">
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

                      <div className="flex gap-3 p-3 items-center justify-between">
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
                          <p className=" text-xl sm:text-2xl md:text-4xl font-bold ">
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

                              getAyahTafsir(ayah.numberInSurah, Tafsir.slug);
                            }}
                            className="text-emerald-400  cursor-pointer">
                            {displayTafsir[ayah.numberInSurah - 1] == false
                              ? "عرض التفسير"
                              : "اخفاء التفسير "}
                          </button>
                          {displayTafsir[index] ? (
                            <div
                              className="text-gray-500 text-sm mt-2"
                              dir="rtl">
                              {tafsirText && (
                                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                                  <p className="text-2xl">
                                    {Tafsir.tafsirName}
                                  </p>

                                  <p className="text-gray-400 text-sm mt-2">
                                    {loadingTafsir
                                      ? "جاري التحميل"
                                      : tafsirText}
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
                    </div>
                  ))}
            </div>
           
            {openModelTafsir && (
              <div className=" ModelTafsir  absolute TafsirModel  inset-0 ">
                <div className="fixed  dark:text-white   rounded z-50 w-[90%] sm:w-[450px]  dark:bg-gray-800 bg-white  left-[50%] top-[50%]  transform translate-[-50%]">
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
                          changeTafsir(ele.id, ele.arabic, ele.slug);
                          const elements = displayTafsir.map((el) =>
                            el == false ? el : ""
                          );
                          elements.filter((el) => (el == "" ? false : el));
                          setdisplayTafsir(elements);
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
        <ModelReciter
          setShowPlayer={setShowPlayer}
          setcopyNameReciters={setcopyNameReciters}
          copyNameReciters={copyNameReciters}
          nameReciter={nameReciter}
          setnameReciter={setnameReciter}
          setreceiterId={setreceiterId}
          setdisplayedRecent={setdisplayedRecent}
          displayedRecent={displayedRecent}
          getRecentReciters={getRecentReciters}
          getAllReciters={getAllReciters}
          getServerOfsura={getServerOfsura}
          handleChangeInpt={handleChangeInpt}
          handleModelRecitersClose={handleModelRecitersClose}
          openModelReciters={openModelReciters}
        
        />
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
        <SuraModel metaData={metaData} setmodelOfSuraData={setmodelOfSuraData}
          modelOfSuraData={modelOfSuraData}
        />
          </div>
        
      
    </>
  );
}

