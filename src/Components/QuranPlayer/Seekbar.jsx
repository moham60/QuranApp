
import { FaPlus, FaMinus } from "react-icons/fa";


export default function Seekbar({value,min,max,onInput,setSeekTime,appTime}) {
    const getTime = (time) => `${Math.floor(time / 60)}:${(`0${Math.floor(time % 60)}`).slice(-2)}`;

    return (
      <div className=" flex  gap-2 items-center ">
       
        <p className="dark:text-white">{value === 0 ? "0:00" : getTime(value)}</p>
        <div className="inpt w-full relative  p-4">
            <input
              type="range"
              step="any"
              value={value}
              min={min}
              max={max}
              onInput={onInput}
              className="custom-slider  "
              title={`${getTime(value)}/${getTime(max)}`}
            />
        
        </div>

        <p className="dark:text-white">{max === 0 ? "0:00" : getTime(max)}</p>
       
      </div>
    );
  }
  


