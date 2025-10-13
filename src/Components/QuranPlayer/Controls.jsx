
import {
  BsArrowRepeat,
  BsFillPauseFill,
  BsFillPlayFill,
 
} from "react-icons/bs";
import { Link, useParams } from "react-router";


export default function Controls({
  isPlaying,
  isLoading,
  repeat,
  setRepeat,
  handlePlayPause,
  setSeekTime,
  appTime,
}) {
  const { number}=useParams();
  return (
    <div className="flex  items-center  gap-2  justify-center">
      {parseInt(number) > 1 ? (
        <Link
          to={`/sura/${parseInt(number) - 1}`}
          className="p-2 cursor-pointer rounded-full dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
          aria-label="Previous">
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
            className="lucide lucide-skip-back h-5 w-5">
            <polygon points="19 20 9 12 19 4 19 20" />
            <line x1={5} x2={5} y1={19} y2={5} />
          </svg>
        </Link>
      ) : (
        <Link
          to={`/sura/114`}
          className="p-2 cursor-pointer rounded-full dark:text-white hover:bg-gray-100  dark:hover:bg-gray-800 focus:outline-none"
          aria-label="Previous">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-skip-back   h-5 w-5">
            <polygon points="19 20 9 12 19 4 19 20" />
            <line x1={5} x2={5} y1={19} y2={5} />
          </svg>
        </Link>
      )}

      <button
        onClick={() => setSeekTime(appTime - 5)}
        className="p-2 minus cursor-pointer rounded-full dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
        aria-label="Skip Backward 10 seconds">
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
          className="lucide lucide-rewind h-5 w-5">
          <polygon points="11 19 2 12 11 5 11 19" />
          <polygon points="22 19 13 12 22 5 22 19" />
        </svg>
      </button>

      {isPlaying ? (
        isLoading ? (
          <span className="bg-emerald-400 rounded-full p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="white"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-refresh-cw h-6 w-6 text-white animate-spin">
              <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
              <path d="M21 3v5h-5" />
              <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
              <path d="M8 16H3v5" />
            </svg>
          </span>
        ) : (
          <BsFillPauseFill
            size={45}
            onClick={handlePlayPause}
            className="cursor-pointer p-2 rounded-full w-10 h-10 bg-emerald-700 text-white"
          />
        )
      ) : (
        <BsFillPlayFill
          size={45}
          onClick={handlePlayPause}
          className="cursor-pointer p-2 rounded-full w-10 h-10 bg-emerald-700 text-white"
        />
      )}
      <button
        onClick={() => setSeekTime(appTime + 5)}
        className=" plus p-2 cursor-pointer dark:text-white rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none">
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
          className="lucide lucide-fast-forward h-5 w-5">
          <polygon points="13 19 22 12 13 5 13 19" />
          <polygon points="2 19 11 12 2 5 2 19" />
        </svg>
      </button>
      {parseInt(number) < 114 ? (
        <Link
          to={`/sura/${parseInt(number) + 1}`}
          className="p-2 cursor-pointer rounded-full dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
          aria-label="Next">
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
            className="lucide lucide-skip-forward h-5 w-5">
            <polygon points="5 4 15 12 5 20 5 4" />
            <line x1={19} x2={19} y1={5} y2={19} />
          </svg>
        </Link>
      ) : (
        <Link
          to={`/sura/1`}
          className="p-2 cursor-pointer rounded-full dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
          aria-label="Next">
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
            className="lucide lucide-skip-forward h-5 w-5">
            <polygon points="5 4 15 12 5 20 5 4" />
            <line x1={19} x2={19} y1={5} y2={19} />
          </svg>
        </Link>
      )}

      <div className="repeat absolute left-12 bottom-4">
        <BsArrowRepeat
          size={20}
          color={repeat ? "red" : "black"}
          onClick={() => {
            setRepeat((prev) => !prev);
          }}
          className="hidden sm:block dark:text-white cursor-pointer"
        />
      </div>
    </div>
  );
}
