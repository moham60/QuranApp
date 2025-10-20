import { useState } from "react";
import Seekbar from "./Seekbar";
import QuranPlayer from "./QuranPlayer";
import { useDispatch, useSelector } from "react-redux";
import Controls from "./Controls";
import { playPause } from "../../redux/feature/Quran";
import VolumeBar from "./VolumeBar";
import { IoMdClose } from "react-icons/io";


// eslint-disable-next-line react/prop-types
export default function Player({ numofSura, activeSura, isLoading,setShowPlayer }) {
  const [duration, setDuration] = useState(0);
  const [seekTime, setSeekTime] = useState(0);
  const [appTime, setAppTime] = useState(0);
  const [repeat, setRepeat] = useState(false);
  const [volumeValue, setvolumeValue] = useState(30);
  
  const { isplaying } = useSelector((state) => state.Quran);
  const dispatch = useDispatch();
  // function formatTime(decimalSeconds) {
  //   const hrs = Math.floor(decimalSeconds / 3600);
  //   const mins = Math.floor((decimalSeconds % 3600) / 60);
  //   const secs = Math.floor(decimalSeconds % 60);

  //   const paddedHrs = hrs;
  //   const paddedMins = mins < 10 ? "0" + mins : mins;
  //   const paddedSecs = secs < 10 ? "0" + secs : secs;

  //   return `${paddedHrs}:${paddedMins}:${paddedSecs}`;
  // }
  return (
    <div className="player">
      <div className="seekBar ">
        <Seekbar
          setSeekTime={setSeekTime}
          appTime={appTime}
          min={0}
          max={duration}
          value={appTime}
          onInput={(e) => { setSeekTime(e.target.value) }}
        />
      
      </div>
      <div className="controls">
        <Controls
          isPlaying={isplaying}
          repeat={repeat}
          isLoading={isLoading}
          setRepeat={setRepeat}
          appTime={appTime}
          setShowPlayer={setShowPlayer}
          setSeekTime={setSeekTime}
          handlePlayPause={() => {
            dispatch(playPause(!isplaying)); //once click it change is playing from  false to true or The opposite.
          }}
        />
      
      </div>
      
      <div className="PlayerAudio ">
        <QuranPlayer
          seekTime={seekTime}
          activeSura={activeSura}
          numofSura={numofSura}
          isplaying={isplaying}
          volume={volumeValue}
          repeat={repeat}
          onEnded={() => {
            dispatch(playPause(false))
          }}
          onLoadedData={(event) => {
            setDuration(event.target.duration);
          }}
          onTimeUpdate={(event) => {
            setAppTime(event.target.currentTime);
          }}
        />
      </div>
      <div className="volumeBar hidden sm:block absolute right-6 top-20">
        <VolumeBar
          onChange={(e) => setvolumeValue(e.target.value)}
          value={volumeValue}
          setVolume={setvolumeValue}
          min={0}
          max={1}
        />
      </div>
      
    </div>
  );
}
