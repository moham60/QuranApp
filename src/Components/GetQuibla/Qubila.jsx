
import axios from "axios";
import { useEffect, useState } from "react";
export default function Qubila() {
  useEffect(() => {
    document.title = "القبلة"
  }, []);
  const [latitude, setlatitude] = useState(null);
  const [longitude, setlongitude] = useState(null);
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (possition) {
        console.log(possition.coords.latitude, possition.coords.longitude);
        setlatitude(possition.coords.latitude);
        setlongitude(possition.coords.longitude);
      })
    }
  }, []);
  useEffect(() => {
    if (longitude && latitude) {
      getQiblaDirection(latitude, longitude);
    }
  }, [longitude, latitude])
  const [direction, setdirection] = useState(0);
  function getQiblaDirection(latitude, longitude) {
    axios.get(`https://api.aladhan.com/v1/qibla/${latitude}/${longitude}`).then(
      (res => {
        console.log(res);
        setTimeout(() => {
            setdirection(res.data.data.direction)
          },1000)
      })
    ).catch((error => {
      console.log(error)
    }));
  }
  return (
    <div className="flex py-20  mt-11 flex-col items-center justify-center">
      <div className="info-location dark:text-white p-6 rounded-xl bg-white w-full sm:w-[90%] md:w-[80%] lg:w-[50%] shadow-2xl dark:bg-gray-800/80 flex justify-between items-center">
        <div className="location-icon flex gap-3 items-center">
          <span className="dark:bg-emerald-700 rounded-xl p-3 flex items-center justify-center bg-emerald-100">
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
              className="lucide lucide-map-pin w-6 h-6 text-emerald-600 dark:text-emerald-400">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx={12} cy={10} r={3} />
            </svg>
          </span>
          <div className="yourLocation text-xl">
            <p className=" font-extrabold">Your Location</p>
            <p className="dark:text-gray-300 text-gray-600">
              {latitude ? latitude : ""}°, {longitude ? longitude : ""}°
            </p>
          </div>
        </div>
        <div className="btn-reload-location">
          <button
            onClick={() => {
              setdirection(0);
              getQiblaDirection(latitude, longitude);
            }}
            className="dark:bg-emerald-800 dark:hover:bg-emerald-700 cursor-pointer p-3 rounded-xl bg-emerald-100 hover:bg-emerald-300">
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
              className="lucide lucide-refresh-cw w-5 h-5 text-emerald-600 dark:text-emerald-400 ">
              <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
              <path d="M21 3v5h-5" />
              <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
              <path d="M8 16H3v5" />
            </svg>
          </button>
        </div>
      </div>
      <div className="qibla  mt-4 dark:text-white p-6 rounded-xl bg-white w-full sm:w-[90%] md:w-[80%] lg:w-[50%] shadow-2xl dark:bg-gray-800/80 flex flex-col justify-center  items-center">
        <div className="circle relative  w-64 h-64 rounded-full border-3 border-gray-300 dark:border-gray-500">
          <div className="north absolute flex flex-col top-2 left-[50%]  translate-x-[-50%]">
            <span className="text-red-500 font-bold">N</span>
          </div>

          <span className="east   font-extrabold absolute right-2 text-xl top-[50%] translate-y-[-50%]dark:text-white text-gray-400">
            E
          </span>

          <span className="west   font-extrabold absolute left-2 text-xl top-[50%] translate-y-[-50%]dark:text-white text-gray-400">
            W
          </span>
          <span className="south  font-extrabold absolute bottom-2 text-xl left-[50%]  translate-x-[-50%]dark:text-white text-gray-400">
            S
          </span>

          <div
            className={`center  font-extrabold transition-all duration-1000 absolute left-[50%] top-[50%] translate-x-[-50%]  translate-y-[-50%] w-24 h-1   rounded-2xl bg-emerald-500  flex justify-end  items-center `}
            style={{
              transform: `rotate(${direction}deg)`,
            }}>
            <span
              className="boslua   rounded-full m-6   w-3 h-3 bg-gray-700  dark:bg-white"
             ></span>
          </div>
        </div>
        <div className="qibla-Direction w-full my-4 dark:bg-emerald-500 rounded-xl p-3 bg-emerald-400 flex items-center justify-between text-white">
          <div>
            <p className="font-extrabold text-2xl">Qibla Direction</p>
            <p className="text-gray-200 text-lg">Facing towards Mecca</p>
          </div>
          <div className="degree">
            <span className="text-2xl font-bold">
              {direction ? direction.toFixed(2) : ""}°
            </span>
          </div>
        </div>
        <div className="turn-info dark:text-yellow-300 w-full text-[#AA711D] dark:bg-yellow-900/30 bg-yellow-100 rounded-xl p-3 text-center">
          <p className="font-extrabold text-xl">
            Turn {direction ? direction.toFixed(2) : ""}° to your right ➡️{" "}
          </p>
          <p className=" font-extralight dark:text-yellow-200 text-[#AA711D] ">
            Follow the arrow and adjust your position
          </p>
        </div>
      </div>
      <div className="howToUse bg-white shadow rounded-xl dark:bg-gray-800/80 p-6 sm:w-[90%] md:w-[80%] lg:w-[50%] my-4">
        <h2 className="flex items-center gap-2">
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
            className="lucide lucide-compass w-6 h-6 text-emerald-600 dark:text-emerald-400">
            <circle cx={12} cy={12} r={10} />
            <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
          </svg>
          <span className="text-2xl dark:text-white font-extrabold">
            How To Use
          </span>
        </h2>
        <ul className="mt-3 text-gray-400 dark:text-gray-300">
          <li className=" my-2 text-xl flex items-center gap-2 ">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-sm">
              1
            </span>
            Allow location access when prompted
          </li>
          <li className=" my-2 text-xl flex items-center gap-2 ">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-sm">
              2
            </span>
            Hold your device flat and parallel to the ground
          </li>
          <li className=" my-2 text-xl flex items-center gap-2 ">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-sm">
              3
            </span>
            The green arrow will point towards the Qibla
          </li>
          <li className=" my-2 text-xl flex items-center gap-2 ">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-sm">
              4
            </span>
            The degree measurement shows the exact Qibla direction from true
            north
          </li>
        </ul>
      </div>
    </div>
  );
}
