import { useEffect, useRef } from "react";


export default function QuranPlayer({ activeSura,volume, numofSura, isplaying, seekTime, onLoadedData,
  onTimeUpdate,repeat,onEnded
}) {
    const audioRef = useRef();
    if (audioRef.current) {
        if (isplaying) {
            audioRef.current.play();
        }
        else {
            audioRef.current.pause();
        }
    }
    useEffect(() => {
        const audio = audioRef.current;
      audio.currentTime = seekTime;
    }, [seekTime]);
  useEffect(() => {
    const audio = audioRef.current;
    audio.volume = volume/100;
  },[volume])
  return (
    <audio
      onLoadedData={onLoadedData}
      ref={audioRef}
      loop={repeat}
      onTimeUpdate={onTimeUpdate}
      onEnded={onEnded}
      src={activeSura && activeSura + `${numofSura && numofSura}.mp3`}></audio>
  );
}
