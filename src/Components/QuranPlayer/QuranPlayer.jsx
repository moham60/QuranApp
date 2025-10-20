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
  if (validSrc && audioRef.current) {
    const audio = audioRef.current;
    audio.load(); // يعيد تهيئة العنصر بالصوت الجديد
  }
}, [validSrc]);
 

    // ✅ إيقاف وتشغيل بناءً على الحالة فقط بعد التحميل
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !validSrc) return;

    if (isplaying) {
      audio.play().catch((err) => console.warn("Play blocked:", err));
    } else {
      audio.pause();
    }
  }, [isplaying, validSrc]);
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

            className="px-4 text-center block mt-2 w-25 mx-auto  py-2 rounded-xl cursor-pointer dark:bg-gray-700 bg-gray-100  dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800 focus:outline-none"
          >
            تحميل التلاوة 
          </a>
    </>
    
  );
}
