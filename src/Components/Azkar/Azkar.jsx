import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router";
import azkarData from "../../azkar_no_extra_commas.json";
import { useEffect, useState } from "react";

export default function Azkar() {
  useEffect(() => {
    document.title = "الأذكار";
  }, []);

  const [zekr, setzekr] = useState(null);
  const [open, setopen] = useState(false);
  const [counters, setcounters] = useState(Array(26).fill(0));
  const [active, setactive] = useState(Array(8).fill(false));
  const [copyicon, setcopy] = useState(true);

  const flattenedAzkar = Array.isArray(zekr)
    ? zekr.flatMap((item) =>
        // Check if item is an array:
        // If yes, return the item as is (e.g. [ {}, {}, {} ])
        // If no, wrap the item in an array (e.g. { content: "ذكر 1" } => [ { content: "ذكر 1" } ])
        Array.isArray(item) ? item : [item]
      )
    : []; // If `zekr` is not an array, return an empty array.

  function handleClick(e) {
    const id = e.currentTarget.id;

    const map = {
      Sabah: "أذكار الصباح",
      Masaa: "أذكار المساء",
      pray: "أذكار بعد السلام من الصلاة المفروضة",
      tasabih: "تسابيح",
      sleep: "أذكار النوم",
      wake: "أذكار الاستيقاظ",
      Adayaa: "أدعية الأنبياء",
      // fallback: handle "أدعية قرآنية" case which has no id
    };

    if (map[id]) {
      setzekr(azkarData[map[id]]);

      setopen(true);
    } else if (e.currentTarget.textContent.includes("أدعية قرآنية")) {
      setzekr(azkarData["أدعية قرآنية"]);
      setopen(true);
    }

    console.log(zekr);
  }

  function handleCounters(index) {
    const newCounters = [...counters];
    newCounters[index]++;
    setcounters(newCounters);
  }
  function handleActive(index) {
    const newArray = [...active];
    newArray.map((el, indx) => {
      if (indx !== index) {
        newArray[indx] = false;
      }
    });
    newArray[index] = true;
    setactive(newArray);
    console.log(active);
  }

  function copyAzkar(text) {
    navigator.clipboard.writeText(text);
    setcopy(false);
    setTimeout(() => {
      setcopy(true);
    }, 2000);
  }
  const [reload, setreload] = useState(Array(26).fill(false));
  function reloadZekr(index) {
    const newReloads = [...reload];

    newReloads[index] = true;
    counters[index] = 0;
    setreload(newReloads);
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
      <div className="mt-2 dark:text-white gap-4 p-4 grid md:grid-cols-3 lg:grid-cols-4">
        <div
          onClick={(e) => {
            handleClick(e);
            handleActive(0);
          }}
          id="Sabah"
          className={
            active[0]
              ? "shadow-lg bg-emerald-500 text-white px-4  py-8 group cursor-pointer hover:translate-y-[-12px] transition-all duration-1000 relative rounded-2xl"
              : "bg-white shadow-lg dark:bg-[#1f2937] px-4  py-8 group cursor-pointer hover:translate-y-[-12px] transition-all duration-1000 relative rounded-2xl"
          }
          dir="rtl">
          <div className=" absolute left-4 top-2 dark:text-emerald-800 group-hover:text-emerald-300">
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
              className="lucide lucide-sun h-6 w-6">
              <circle cx={12} cy={12} r={4} />
              <path d="M12 2v2" />
              <path d="M12 20v2" />
              <path d="m4.93 4.93 1.41 1.41" />
              <path d="m17.66 17.66 1.41 1.41" />
              <path d="M2 12h2" />
              <path d="M20 12h2" />
              <path d="m6.34 17.66-1.41 1.41" />
              <path d="m19.07 4.93-1.41 1.41" />
            </svg>
          </div>

          <p>أذكار الصباح</p>
          <p className={active[0] ? "dark:text-[#fff]" : "dark:text-[#9CA3AF]"}>
            <span className="ml-2">ذكر</span>
            {azkarData["أذكار الصباح"].length}{" "}
          </p>
        </div>
        <div
          onClick={(e) => {
            handleClick(e);
            handleActive(1);
          }}
          id="Masaa"
          className={
            active[1]
              ? " shadow-lg bg-emerald-500 text-white px-4  py-8 group cursor-pointer hover:translate-y-[-12px] transition-all duration-1000 relative rounded-2xl"
              : "bg-white shadow-lg dark:bg-[#1f2937] px-4  py-8 group cursor-pointer hover:translate-y-[-12px] transition-all duration-1000 relative rounded-2xl"
          }
          dir="rtl">
          <div className=" absolute left-4 top-2 dark:text-emerald-800 group-hover:text-emerald-300">
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
              className="lucide lucide-moon h-6 w-6">
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
            </svg>
          </div>

          <p>أذكار المساء</p>
          <p className={active[1] ? "dark:text-white" : "dark:text-[#9CA3AF]"}>
            <span className="ml-2">ذكر</span>
            {azkarData["أذكار المساء"].length}{" "}
          </p>
        </div>
        <div
          id="pray"
          onClick={(e) => {
            handleClick(e);
            handleActive(2);
          }}
          className={
            active[2]
              ? " shadow-lg bg-emerald-500 text-white px-4  py-8 group cursor-pointer hover:translate-y-[-12px] transition-all duration-1000 relative rounded-2xl"
              : "bg-white shadow-lg dark:bg-[#1f2937] px-4  py-8 group cursor-pointer hover:translate-y-[-12px] transition-all duration-1000 relative rounded-2xl"
          }
          dir="rtl">
          <p>أذكار بعد السلام من الصلاة المفروض</p>
          <p className={active[2] ? "dark:text-white" : "dark:text-[#9CA3AF]"}>
            <span className="ml-2">ذكر</span>
            {azkarData["أذكار بعد السلام من الصلاة المفروضة"].length}{" "}
          </p>
        </div>
        <div
          id="tasabih"
          onClick={(e) => {
            handleClick(e);
            handleActive(3);
          }}
          className={
            active[3]
              ? " shadow-lg bg-emerald-500 text-white px-4  py-8 group cursor-pointer hover:translate-y-[-12px] transition-all duration-1000 relative rounded-2xl"
              : "bg-white shadow-lg dark:bg-[#1f2937] px-4  py-8 group cursor-pointer hover:translate-y-[-12px] transition-all duration-1000 relative rounded-2xl"
          }
          dir="rtl">
          <p>تسابيح</p>
          <p className={active[3] ? "dark:text-white" : "dark:text-[#9CA3AF]"}>
            <span className="ml-2">ذكر</span>
            {azkarData["تسابيح"].length}{" "}
          </p>
        </div>
        <div
          id="sleep"
          onClick={(e) => {
            handleClick(e);
            handleActive(4);
          }}
          className={
            active[4]
              ? " shadow-lg bg-emerald-500 text-white px-4  py-8 group cursor-pointer hover:translate-y-[-12px] transition-all duration-1000 relative rounded-2xl"
              : "bg-white shadow-lg dark:bg-[#1f2937] px-4  py-8 group cursor-pointer hover:translate-y-[-12px] transition-all duration-1000 relative rounded-2xl"
          }
          dir="rtl">
          <p>أذكار النوم</p>
          <p className={active[4] ? "dark:text-white" : "dark:text-[#9CA3AF]"}>
            <span className="ml-2">ذكر</span>
            {azkarData["أذكار النوم"].length}{" "}
          </p>
        </div>
        <div
          id="wake"
          onClick={(e) => {
            handleClick(e);
            handleActive(5);
          }}
          className={
            active[5]
              ? " shadow-lg bg-emerald-500 text-white px-4  py-8 group cursor-pointer hover:translate-y-[-12px] transition-all duration-1000 relative rounded-2xl"
              : "bg-white shadow-lg dark:bg-[#1f2937] px-4  py-8 group cursor-pointer hover:translate-y-[-12px] transition-all duration-1000 relative rounded-2xl"
          }
          dir="rtl">
          <p>أذكار الأستيقاظ</p>
          <p className={active[5] ? "dark:text-white" : "dark:text-[#9CA3AF]"}>
            <span className="ml-2">ذكر</span>
            {azkarData["أذكار الاستيقاظ"].length}{" "}
          </p>
        </div>
        <div
          onClick={(e) => {
            handleClick(e);
            handleActive(6);
          }}
          className={
            active[6]
              ? " shadow-lg bg-emerald-500 text-white px-4  py-8 group cursor-pointer hover:translate-y-[-12px] transition-all duration-1000 relative rounded-2xl"
              : "bg-white shadow-lg dark:bg-[#1f2937] px-4  py-8 group cursor-pointer hover:translate-y-[-12px] transition-all duration-1000 relative rounded-2xl"
          }
          dir="rtl">
          <p>أدعية قرآنية</p>
          <p className={active[6] ? "dark:text-white" : "dark:text-[#9CA3AF]"}>
            <span className="ml-2">ذكر</span>
            {azkarData["أدعية قرآنية"].length}{" "}
          </p>
        </div>
        <div
          id="Adayaa"
          onClick={(e) => {
            handleClick(e);
            handleActive(7);
          }}
          className={
            active[7]
              ? "shadow-lg bg-emerald-500 text-white px-4  py-8 group cursor-pointer hover:translate-y-[-12px] transition-all duration-1000 relative rounded-2xl"
              : "bg-white shadow-lg dark:bg-[#1f2937] px-4  py-8 group cursor-pointer hover:translate-y-[-12px] transition-all duration-1000 relative rounded-2xl"
          }
          dir="rtl">
          <p>أدعية الأنبياء</p>
          <p className={active[7] ? "dark:text-white" : "dark:text-[#9CA3AF]"}>
            <span className="ml-2">ذكر</span>
            {azkarData["أدعية الأنبياء"].length}
          </p>
        </div>
      </div>

      {open && (
        <div className="p-6 relative" style={{ minHeight: "100vh" }}>
          <div className="flex justify-between items-center">
            <h2 className="dark:text-white text-2xl">
              {flattenedAzkar[0].category}
            </h2>
            <button
              onClick={() => {
                setopen(false);
                const newactive = Array(8).fill(false);
                setactive(newactive);
              }}
              className=" cursor-pointer bg-[#f3f4f7] text-[#4e5158] shadow  hover:bg-[#E5E7EB]  dark:text-white dark:hover:text-emerald-300 dark:hover:bg-transparent   dark:bg-gray-700 py-3 px-5 rounded-xl">
              <span>اغلاق</span>
            </button>
          </div>

          {flattenedAzkar.map((el, index) => {
            if (el.category === "stop") return null; // skip invalid or placeholder items

            return (
              <div
                onClick={() => {
                  if (counters[index] < el.count) {
                    handleCounters(index);
                  } else {
                    counters[index] = 0;
                    el.count = 0;
                  }
                }}
                key={index}
                id={index}
                className="dark:bg-gray-800 mt-10 pt-20 pb-4 px-2 border-1 border-transparent transition-all group relative  duration-700 shadow-lg bg-white  hover:border-emerald-300 hover:text-emerald-400 hover:cursor-pointer text-4xl my-4 rounded-2xl dark:text-white"
                dir="rtl">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    copyAzkar(el.content);
                  }}
                  className="text-xl cursor-pointer dark:bg-[#4B5563] dark:text-[#9098A4] bg-white  shadow p-3 flex rounded-xl hover:bg-gray-100 hover:scale-105   absolute left-4 top-2 text-gray-400 dark:hover:bg-[#4B5562] opacity-0  group-hover:opacity-100 transition-all duration-100">
                  {copyicon ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="1em"
                      height="1em">
                      <path
                        fill="currentColor"
                        d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2m0 16H8V7h11z"></path>
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="1em"
                      height="1em">
                      <mask id="lineMdCheckAll0">
                        <g
                          fill="none"
                          stroke="#fff"
                          strokeDasharray="24"
                          strokeDashoffset="24"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2">
                          <path d="M2 13.5l4 4l10.75 -10.75">
                            <animate
                              fill="freeze"
                              attributeName="stroke-dashoffset"
                              dur="0.4s"
                              values="24;0"></animate>
                          </path>
                          <path
                            stroke="#000"
                            strokeWidth="6"
                            d="M7.5 13.5l4 4l10.75 -10.75">
                            <animate
                              fill="freeze"
                              attributeName="stroke-dashoffset"
                              begin="0.4s"
                              dur="0.4s"
                              values="24;0"></animate>
                          </path>
                          <path d="M7.5 13.5l4 4l10.75 -10.75">
                            <animate
                              fill="freeze"
                              attributeName="stroke-dashoffset"
                              begin="0.4s"
                              dur="0.4s"
                              values="24;0"></animate>
                          </path>
                        </g>
                      </mask>
                      <rect
                        width="24"
                        height="24"
                        fill="#5EE9B5"
                        mask="url(#lineMdCheckAll0)"></rect>
                    </svg>
                  )}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    reloadZekr(index);
                  }}
                  className="text-xl cursor-pointer dark:bg-[#4B5563] dark:text-[#9098A4] bg-white shadow p-3 flex rounded-xl hover:bg-gray-100 hover:scale-105   absolute left-4 top-10 mt-5 text-gray-400 dark:hover:bg-[#4B5562] opacity-0  group-hover:opacity-100 transition-all duration-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="1em"
                    height="1em">
                    <g
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2">
                      <path d="M4.266 16.06a8.92 8.92 0 0 0 3.915 3.978a8.7 8.7 0 0 0 5.471.832a8.8 8.8 0 0 0 4.887-2.64a9.07 9.07 0 0 0 2.388-5.079a9.14 9.14 0 0 0-1.044-5.53a8.9 8.9 0 0 0-4.068-3.815a8.7 8.7 0 0 0-5.5-.608c-1.85.401-3.367 1.313-4.62 2.755a7.6 7.6 0 0 0-1.22 1.781"></path>
                      <path d="m8.931 7.813l-5.04.907L3 3.59"></path>
                    </g>
                  </svg>
                </button>
                <span className="text-2xl absolute right-4 top-2 text-gray-400 dark:text-gray-500 opacity-0  group-hover:opacity-100 transition-all duration-300">
                  انقر للعد ✨
                </span>

                <p className=" my-5">{el.content}</p>
                {el.count && (
                  <div className="  my-6">
                    {el.description && (
                      <p className="text-xl my-4 text-gray-500">
                        {el.description}
                      </p>
                    )}
                    <div className="flex flex-col justify-center sm:flex-row  w-full gap-2 items-center  text-center">
                      <div className="left dark:text-[#60A5FA] text-blue-600   py-4 bg-blue-300 dark:bg-[#131A29] rounded-2xl w-[100%]">
                        <span className="  ">
                          التكرار {el.count.split("0")} / {counters[index]}
                        </span>
                      </div>

                      <div
                        className={
                          el.count - counters[index] == 0
                            ? " bg-emerald-500  right w-[100%] text-white shadow-2xl shadow-emerald-400   rounded-2xl py-4"
                            : "dark:text-emerald-300 right w-[100%] text-emerald-500 bg-[#D4FBE7]  dark:bg-[#131A29] rounded-2xl py-4"
                        }>
                        <span>
                          المتبقي {parseInt(el.count) - counters[index]}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
