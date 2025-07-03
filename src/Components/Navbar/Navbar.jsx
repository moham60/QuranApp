import { Link, NavLink } from "react-router";
import { useEffect, useState } from "react";
import { Sun } from "lucide-react";
import { Moon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setOpenBookMark } from "../../redux/feature/Quran";
import SideModel from "../SideModel/SideModel";


export default function Nav() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const dispatch = useDispatch();
  const { currentBookmarkAyat } = useSelector((state) => state.Quran);
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);
  const [translateX, settranslateX] = useState(100)
  return (
    <>
      <nav className="bg-white border-b-1 border-gray-600 dark:bg-[#0F1423] fixed w-full  top-0 z-40 shadow">
        <div className="   flex flex-wrap justify-center  md:flex-nowrap   items-center    md:justify-between mx-auto px-2 py-1">
          <Link
            to="/"
            className="flex flex-col  w-[100%] sm:w-[50%] md:w-auto justify-center  items-center group hover:bg-blue-200 p-2  rounded transition-all duration-1000">
            <span className="  md:text-xl bg-gradient-to-br from-emerald-600 to-blue-600 bg-clip-text text-transparent group-hover:from-emerald-500 group-hover:to-blue-500 transition-all duration-300">
              القُرآن الكَريم
            </span>
            <span className="uppercase text-gray-400">Al-quran al-karim</span>
          </Link>

          <div className="flex w-[100%] sm:w-[50%]  justify-center md:w-auto md:order-2 items-center gap-2">
            <button
              title="show all pages"
              
              onClick={() => {
                
                console.log("clicked");
                settranslateX(0);
              }}
              className="inline-flex text-2xl cursor-pointer items-center p-2 w-10 h-10 justify-center  text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
              <svg
                className="w-5 h-5"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 17 14">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
            <button
              onClick={() => {
                dispatch(setOpenBookMark(true));
              }}
              className={`hover:bg-black bookMark text-2xl hover:text-white hover:cursor-pointer p-2 rounded dark:hover:bg-gray-500 `}>
              {currentBookmarkAyat.length > 0 ? (
                <svg
                  width={15}
                  height={15}
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-emerald-500 animate-fadeIn">
                  <path
                    d="M3.5 2C3.22386 2 3 2.22386 3 2.5V13.5C3 13.6818 3.09864 13.8492 3.25762 13.9373C3.41659 14.0254 3.61087 14.0203 3.765 13.924L7.5 11.5896L11.235 13.924C11.3891 14.0203 11.5834 14.0254 11.7424 13.9373C11.9014 13.8492 12 13.6818 12 13.5V2.5C12 2.22386 11.7761 2 11.5 2H3.5Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-bookmark text-gray-500 hover:text-white w-5 h-5">
                  <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
                </svg>
              )}
            </button>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 text-2xl hover:bg-black hover:text-white hover:cursor-pointer dark:bg-gray-800 rounded-lg transition duration-300 text-black dark:text-white">
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
          <div
            className="items-center  justify-between  w-full hidden md:flex flex-1  md:order-1"
            id="navbar-search">
            <ul className="flex flex-col p-4 mt-4  border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-2 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-[#0F1423] dark:border-gray-700">
              <li>
                <NavLink
                  to="/"
                  className="flex text-sm lg:text-xl items-center  gap-2 p-1 text-black dark:text-white hover:text-emerald-800 dark:hover:text-emerald-300 transition-all">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-home h-4 w-4">
                    <path d="M3 9L12 2l9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                  الصفحة الرئيسية
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/prayerTime"
                  className="flex text-sm lg:text-xl items-center gap-2 p-1 text-black dark:text-white hover:text-emerald-300 transition-all duration-1000">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-clock h-4 w-4">
                    <circle cx={12} cy={12} r={10} />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  أوقات الصلاة
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/azkar"
                  className="flex text-sm lg:text-xl items-center gap-2 p-1 text-black dark:text-white hover:text-emerald-300 transition-all duration-1000">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-book h-4 w-4">
                    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                  </svg>
                  أذكار وأدعية
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/qibla"
                  className="flex text-sm lg:text-xl items-center  p-1 text-black dark:text-white transition-all  hover:text-emerald-300 duration-1000 ">
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
                    className="lucide lucide-compass h-4 w-4 mr-2  ">
                    <circle cx={12} cy={12} r={10} />
                    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
                  </svg>
                  <span>القبلة </span>
                </NavLink>
              </li>
            </ul>
            <NavLink
              to="/search"
              className="search text-sm  lg:text-2xl hover:text-white hover:bg-black  transition-all duration-700 py-2 px-4 rounded-xl gap-2.5 flex items-center text-black dark:text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={20}
                height={20}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-search">
                <circle cx={11} cy={11} r={8} />
                <path d="m21 21-4.3-4.3" />
              </svg>
              Search
            </NavLink>
          </div>
        </div>
      </nav>
      {<SideModel  translateX={translateX}
      setTranslateX={settranslateX}/>}
    </>
  );
}
