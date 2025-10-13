import axios from "axios";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router";

export default function Search() {
  const [lang, setlang] = useState("ar");
  const inputRef = useRef(null);
  const [searchedValues, setsearchedValues] = useState(null);
  const [isloading, setisloading] = useState(false);
  const navigate = useNavigate();
  const [error, seterror] = useState(null);

  function handleSwitchLang() {
    if (lang == "ar") {
      setlang("en");
    } else {
      setlang("ar");
    }
  }

  function handleSearch(word) {
    setisloading(true);
    axios
      .get(`https://api.alquran.cloud/v1/search/${word}/all/${lang}`)
      .then((res) => {
        console.log(res);
        setsearchedValues(res.data.data.matches);
        setisloading(false);
      })
      .catch((res) => {
        console.log(res);
        setisloading(false);
        seterror(res.response.data.data);
        setsearchedValues(null);
      });
  }
  function stateInputLang(text) {
    const arabicRegex = /[\u0600-\u06FF]/;
    if (arabicRegex.test(text)) {
      return "ar";
    } else {
      return "en";
    }
  }

  return (
    <div className="  py-28 searchPage ">
      <div className="dark:text-white py-2  ">
        <>
          <div className=" px-2 py-5 flex gap-1 items-center  border-b-1 border-gray-500 ">
            <Link
              to="/"
              className="py-1 px-2 hover:bg-gray-100  rounded-lg dark:hover:bg-gray-400 transition-all duration-150"
              href="#/"
              data-discover="true">
              <svg
                width={20}
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="arrow-left-long"
                className="svg-inline--fa fa-arrow-left-long "
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512">
                <path
                  fill="currentColor"
                  d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288 480 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-370.7 0 73.4-73.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-128 128z"
                />
              </svg>
            </Link>

            <span className="text-2xl "> البحث في القُرآن الكَريم</span>
          </div>
          <div className="flex py-4 gap-5 items-center justify-center flex-col">
            <div className=" rounded-2xl p-3">
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
                className="lucide lucide-search w-6 h-6 text-emerald-600 dark:text-emerald-400">
                <circle cx={11} cy={11} r={8} />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </div>

            <p className="text-xl  sm:text-3xl">إبحث في آيات القرآن الكريم</p>
            <p className="text-[#9BA2AE]  text-center">
              يمكنك البحث في القرآن الكريم باللغة العربية أو الإنجليزية. ابحث عن
              الآيات باستخدام الكلمات المفتاحية أو المعاني.
            </p>
            <div className="flex items-center gap-5 text-[#9BA2AE] ">
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
                  className="lucide lucide-book w-4 h-4">
                  <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                </svg>
                114 سورة
              </span>
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
                  className="lucide lucide-search w-4 h-4">
                  <circle cx={11} cy={11} r={8} />
                  <path d="m21 21-4.3-4.3" />
                </svg>
                بحث فوري
              </span>
            </div>
            <div className="flex justify-center flex-wrap items-center p-4 gap-4 w-[100%] sm:w[90%] lg:w-[100%]">
              <button
                onClick={handleSwitchLang}
                title={
                  lang == "ar" ? "translate to English" : "translate to Arabic"
                }
                className=" border border-gray-500 cursor-pointer dark:bg-[#1F2937] bg-white p-4 rounded-2xl">
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
                  className="lucide hover:text-emerald-500 lucide-languages w-5 h-5 text-gray-500 group-hover:text-emerald-500 transition-colors">
                  <path d="m5 8 6 6" />
                  <path d="m4 14 6-6 2-3" />
                  <path d="M2 5h12" />
                  <path d="M7 2h1" />
                  <path d="m22 22-5-10-5 10" />
                  <path d="M14 18h6" />
                </svg>
              </button>
              <div className="relative w-[90%] sm:w-[85%] lg:w-[80%]  ">
                <button
                  type="submit"
                  onClick={() => {
                    if (stateInputLang(inputRef.current.value) == lang) {
                      handleSearch(inputRef.current.value);
                    } else {
                      seterror(
                        "the entered language must be matched with input language"
                      );
                    }
                  }}
                  className={
                    lang == "ar"
                      ? "absolute cursor-pointer  inset-y-0 start-0 flex justify-between items-center ps-3 "
                      : "absolute cursor-pointer  inset-y-0 end-0 flex justify-between items-center pe-3 "
                  }>
                  <svg
                    className="w-4  hover:text-emerald-300  h-4 text-gray-500 dark:text-gray-400"
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
                </button>
                <input
                  dir={lang == "ar" ? "rtl" : "ltr"}
                  type="text"
                  id="default-search"
                  ref={inputRef}
                  autoComplete="off"
                  className="block w-full  focus:outline-none focus:ring-1 focus:ring-emerald-300   px-4 py-5   text-sm text-gray-900 border-1 border-gray-400/20  rounded-xl bg-gray-50   dark:bg-gray-700   dark:placeholder-gray-400 dark:text-white    "
                  placeholder={
                    lang == "ar"
                      ? "ابحث عن الآية (مثال: بسم الله، الرحمن)..."
                      : "Search for verses (e.g., 'mercy', 'prayer')..."
                  }
                  required
                />
              </div>
            </div>
          </div>
        </>
      </div>
      {isloading && (
        <div className="flex items-center justify-center ">
          <span
            style={{ display: "block", margin: "auto" }}
            className="loader"></span>
        </div>
      )}
      <div className="mt-4  px-4 w-[100%] sm:w[90%] lg:w-[70%] m-auto ">
        {searchedValues ? (
          searchedValues.map((el, index) => (
            <div key={index}>
              <button
                onClick={() => {
                  navigate(`/sura/${el.surah.number}`);
                }}
                className="dark:bg-[#141C2A] relative block px-10  pb-10 pt-14 h-auto w-full border dark:border-[#222] border-[white] dark:hover:border-[#111] hover:border-emerald-300 hover:cursor-pointer bg-white dark:text-white hover:translate-y-[-5px] my-5 rounded-2xl group transition-all duration-300">
                <p className="dark:bg-[#102D30] bg-[#D1FAE5]  flex gap-2 text-[#42B48E] dark:text-[#34D399] py-2 px-10 rounded-xl absolute left-4 top-2">
                  <span> آية {el.numberInSurah}</span>
                  <span>
                    ({el.surah.number})
                    {lang == "en" ? el.surah.englishName : el.surah.name}
                  </span>
                </p>
                <p className=" text-right text-3xl group-hover:text-emerald-300">
                  {el.text}
                </p>
              </button>
            </div>
          ))
        ) : error ? (
          <div className="text-center w-[75%] m-auto border border-red-700 text-[#BD6371]  py-6 p-2 rounded-2xl text-2xl">
            <p>{error}</p>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
