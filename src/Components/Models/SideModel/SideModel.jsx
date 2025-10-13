
import { Link, NavLink } from "react-router";
import { MdQuiz } from "react-icons/md";
import { FaCalendarDays } from "react-icons/fa6";

import { IoMdClose } from "react-icons/io";
export default function SideModel({translateX,setTranslateX}) {
     
   
  return (
    <div
      className={`min-h-[100vh] transition-all duration-1000  right-0 top-0 bottom-0 w-64 fixed z-50 p-4 bg-white shadow dark:bg-black`}
      style={{ transform: `translateX(${translateX}%)` }}>
      <div className="aboslute closeBtn">
        <button
          className="cursor-pointer"
          onClick={() => {
            setTranslateX(100);
          }}>
          <IoMdClose
            size={20}
            className="dark:text-white   rounded hover:bg-gray-500"
          />
        </button>
      </div>
      <div className="flex flex-col justify-center gap-4">
        <Link
          to="/"
          className="flex flex-col  w-[100%]  md:w-auto justify-center  items-center group hover:bg-blue-200 p-2  rounded transition-all duration-1000">
          <span className="  md:text-xl bg-gradient-to-br from-emerald-600 to-blue-600 bg-clip-text text-transparent group-hover:from-emerald-500 group-hover:to-blue-500 transition-all duration-300">
            القُرآن الكَريم
          </span>
          <span className="uppercase text-gray-400">Al-quran al-karim</span>
        </Link>

        <div id="navbar-search">
          <ul className="flex flex-col p-4">
            <li className="my-2">
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
            <li className="my-2">
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
            <li className="my-2">
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
            <li className="my-2">
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
            <li className="my-2">
              <NavLink
                to={`/questions`}
                className="flex gap-2 text-sm lg:text-xl items-center  p-1 text-black dark:text-white transition-all  hover:text-emerald-300 duration-1000 ">
                <MdQuiz className="dark:text-white" size={20} />

                <span>امتحان قصير </span>
              </NavLink>
            </li>
            <li className="my-2">
              <NavLink
                to={`/ayam`}
                className="flex gap-2 text-sm lg:text-xl items-center  p-1 text-black dark:text-white transition-all  hover:text-emerald-300 duration-1000 ">
                <FaCalendarDays className="dark:text-white" size={20} />

                <span>أيام عظيمة</span>
              </NavLink>
            </li>
          </ul>
          <NavLink
            to="/search"
            className="search text-sm  lg:text-2xl hover:text-black hover:bg-black  transition-all duration-700 py-2 px-4 rounded-xl gap-2.5 flex items-center text-black dark:text-white">
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
    </div>
  );
}
