import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { playPause } from "../redux/feature/Quran";
import axios from "axios";

export default function useReciterModal({
  getServerOfsura,
  getRecentReciters,
}) {
  const dispatch = useDispatch();
  //reciters from Api
  const [allReciters, setAllReciters] = useState([]);

  useEffect(() => {
    axios.get("https://mp3quran.net/api/v3/reciters")
      .then(res => {
        setAllReciters(res.data.reciters);
        setFilteredReciters(res.data.reciters);
      });
  }, []);

  // 🔹 حالة المودال
  const [openModelReciters, setOpenModelReciters] = useState(false);
  const handleModelRecitersOpen = () => setOpenModelReciters(true);
  const handleModelRecitersClose = () => setOpenModelReciters(false);

  // 🔹 إدارة القراء
  const [filteredReciters, setFilteredReciters] = useState(allReciters || []);
  const [displayedRecent, setDisplayedRecent] = useState(false);
  const [nameReciter, setNameReciter] = useState("إبراهيم الأخضر");
  const [reciterId, setReciterId] = useState(null);

  // 🔹 البحث
  const handleChangeInput = (value) => {
    if (!value.trim()) return setFilteredReciters(allReciters);
    setFilteredReciters(
      allReciters.filter((r) => r.name.includes(value.trim()))
    );
  };

  // 🔹 التبديل بين All / Recent
  const handleShowAll = () => {
    setFilteredReciters(allReciters);
    setDisplayedRecent(false);
  };

  const handleShowRecent = async () => {
    const recent = await getRecentReciters();
    setFilteredReciters(recent);
    setDisplayedRecent(true);
  };

  // 🔹 اختيار القارئ
  const handleSelectReciter = (reciter) => {
    setNameReciter(reciter.name);
    setReciterId(reciter.id);
    getServerOfsura(reciter.id);
    dispatch(playPause(true));
    setOpenModelReciters(false);
  };

  return {
    // State
    openModelReciters,
    filteredReciters,
    displayedRecent,
    nameReciter,
    reciterId,

    // Actions
    handleModelRecitersOpen,
    handleModelRecitersClose,
    handleChangeInput,
    handleShowAll,
    handleShowRecent,
    handleSelectReciter,
  };
}
