import { useEffect, useRef, useState } from "react";


export default function QuranPlayer({ activeSura,volume, numofSura, isplaying, seekTime, onLoadedData,
  onTimeUpdate,repeat,onEnded
}) {
  const audioRef = useRef();
    const [validSrc, setValidSrc] = useState("");

  useEffect(() => {
    if(activeSura && numofSura) {
      const tempSrc = `${activeSura}${numofSura}.mp3`;
      // ✅ تحقق من صلاحية الرابط
      fetch(tempSrc, { method: "HEAD" })
        .then((res) => {
          if (res.ok) {
            setValidSrc(tempSrc);
          } else {
            setValidSrc("");
            toast.error("⚠️ القارئ غير متوفر في هذه السورة");
          }
        })
        .catch(() => {
          setValidSrc("");
          toast.error("⚠️ القارئ غير متوفر في هذه السورة");
        });
    }
  }, [activeSura, numofSura]);

    useEffect(() => {
        const audio = audioRef.current;
      audio.currentTime = seekTime;
    }, [seekTime]);
  useEffect(() => {
    const audio = audioRef.current;
    audio.volume = volume / 100;
  }, [volume]);
useEffect(() => {
  const audio = audioRef.current;
  if (!audio) return;

  // لو مفيش مصدر صوت صالح، أوقف أي تشغيل
  if (!validSrc) {
    audio.pause();
    return;
  }

  if (isplaying) {
    audio.play().catch((err) => {
      console.warn("Playback error:", err);
    });
  } else {
    audio.pause();
  }
}, [isplaying, validSrc]);
  const handleDownload = (audio) => {
  
    console.log("audio",audio)

  }
  return (
    <>
    <audio
      onLoadedData={onLoadedData}
      ref={audioRef}
      
      loop={repeat}
      onTimeUpdate={onTimeUpdate}
      onEnded={onEnded}
        src={validSrc}></audio>
      <a
            href={validSrc}

            className="px-4 absolute left-24 bottom-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition-all shadow"
          >
            تحميل التلاوة 🎵
          </a>
    </>
    
  );
}
