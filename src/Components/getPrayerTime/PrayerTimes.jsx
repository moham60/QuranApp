
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import CardPrayer from "../../Card/Card";
import img1 from "../../assets/imagesPages/concept-ramadan-tradition.jpg";
import img2 from "../../assets/imagesPages/people-celebrating-ramadan-together.jpg";
import img3 from "../../assets/imagesPages/preparation-ramadan-tradition.jpg";
import img4 from "../../assets/imagesPages/ramadan-celebration-digital-art.jpg";
import img5 from "../../assets/imagesPages/img5.jpg";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import moment from "moment";
import "moment/dist/locale/ar-dz";
import { motion } from "motion/react";
import Grid from "@mui/material/Grid";


moment.locale("ar-dz");

export default function PrayerTimes() {
  useEffect(() => {
    document.title = "مواقيت الصلاة";
  }, []);
  const [cityname, setcityname] = useState({
    apiname: "Alexandria",
    displayedName: "الإسكندرية",
  });
  const handleChange = (event) => {
    console.log(cityname);
    setcityname(event.target.value || {});
  };

  const cities = [
    { english: "Cairo", arabic: "القاهرة" },
    { english: "Alexandria", arabic: "الإسكندرية" },
    { english: "Giza", arabic: "الجيزة" },
    { english: "Shubra El-Kheima", arabic: "شبرا الخيمة" },
    { english: "Port Said", arabic: "بورسعيد" },
    { english: "Suez", arabic: "السويس" },
    { english: "Luxor", arabic: "الأقصر" },
    { english: "Asyut", arabic: "أسيوط" },
    { english: "Mansoura", arabic: "المنصورة" },
    { english: "Tanta", arabic: "طنطا" },
    { english: "Aswan", arabic: "أسوان" },
    { english: "Damietta", arabic: "دمياط" },
    { english: "Zagazig", arabic: "الزقازيق" },
    { english: "Ismailia", arabic: "الإسماعيلية" },
    { english: "Fayoum", arabic: "الفيوم" },
    { english: "Qena", arabic: "قنا" },
    { english: "Beni Suef", arabic: "بني سويف" },
    { english: "Sohag", arabic: "سوهاج" },
    { english: "Hurghada", arabic: "الغردقة" },
    { english: "Minya", arabic: "المنيا" },
  ];
  const [today, settoday] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["prayerTimes", cityname],
    queryFn: getPrayersTime,
  });

  const timing = data?.data.data.timings;
  useEffect(() => {
    if (timing) {
      const t = moment().format("MMMM Do YYYY | h:mm");
      settoday(t);
      let interval = setInterval(() => setupCountDown(), 1000);
      return () => clearInterval(interval);
    }
  }, [timing]);

  function getPrayersTime() {
    return axios.get(
      `https://api.aladhan.com/v1/timingsByCity?country=EG&city=${cityname.apiname}`
    );
  }
  const [nextPrayerIndex, setnextPrayerIndex] = useState(0);
  var nextPrayersArray = [
    {
      key: "Fajr",
      displayedName: "الفجر",
    },
    { key: "Dhuhr", displayedName: "الظهر" },
    { key: "Asr", displayedName: "العصر" },
    { key: "Maghrib", displayedName: "المغرب" },
    { key: "Isha", displayedName: "العشاء" },
  ];

  const [remainingTime, setremainingTime] = useState("");
  const setupCountDown = () => {
    const momentNow = moment();
    var prayerIndex = 0;
    if (
      momentNow.isAfter(moment(timing["Fajr"], "hh:mm")) &&
      momentNow.isBefore(moment(timing["Dhuhr"], "hh:mm"))
    ) {
      prayerIndex = 1;
    } else if (
      momentNow.isAfter(moment(timing["Dhuhr"], "hh:mm")) &&
      momentNow.isBefore(moment(timing["Asr"], "hh:mm"))
    ) {
      prayerIndex = 2;
    } else if (
      momentNow.isAfter(moment(timing["Asr"], "hh:mm")) &&
      momentNow.isBefore(moment(timing["Maghrib"], "hh:mm"))
    ) {
      prayerIndex = 3;
    } else if (
      momentNow.isAfter(moment(timing["Maghrib"], "hh:mm")) &&
      momentNow.isBefore(moment(timing["Isha"], "hh:mm"))
    ) {
      prayerIndex = 4;
    } else {
      prayerIndex = 0;
    }
    setnextPrayerIndex(prayerIndex);
    /*now set timer*/
    const nextPrayerobj = nextPrayersArray[prayerIndex];
    const nextPrayertime = timing[nextPrayerobj.key];
    const nextPrayertimeMoment = moment(nextPrayertime, "hh:mm");
    const remainingTime = moment(moment(nextPrayertime, "hh:mm")).diff(
      momentNow
    );
    let daurationRemaingTime = moment.duration(remainingTime);

    if (remainingTime < 0) {
      const midnightDiff = moment("23:59:59", "hh:mm:ss").diff(momentNow);
      const fajrToMidnightDiff = nextPrayertimeMoment.diff(
        moment("00:00:00", "hh:mm:ss")
      );
      const totalDiff = midnightDiff + fajrToMidnightDiff;
      daurationRemaingTime = moment.duration(totalDiff);
    }

    setremainingTime(
      `${daurationRemaingTime.hours()}:${daurationRemaingTime.minutes()}:${daurationRemaingTime.seconds()}`
    );
    console.log(
      `${daurationRemaingTime.hours()}:${daurationRemaingTime.minutes()}:${daurationRemaingTime.seconds()}`
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[100vh]">
        <span
          style={{ display: "block", margin: "auto" }}
          className="loader"></span>
      </div>
    );
  }
  const cardInfo = [
    {
      title: "الفجر",
      time: timing.Fajr,
      img: img1,
    },
    {
      title: "الضهر",
      time: timing.Dhuhr,
      img: img2,
    },
    {
      title: "العصر",
      time: timing.Asr,
      img: img3,
    },
    {
      title: "المغرب",
      time: timing.Maghrib,
      img: img4,
    },
    {
      title: "العشاء",
      time: timing.Isha,
      img: img5,
    },
  ];
  return (
    <motion.div
      dir="rtl"
      className="  text-black  dark:text-white p-20 mt-11 m-auto w-full"
      initial={{ opacity: 0, translateX: "100%" }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ duration: 2.5 }}>
      <Grid container sx={{ alignItems: "center" }}>
        <Grid sx={{ my: 2 }} size={{ xs: 12, sm: 6 }}>
          <h2>{today}</h2>
          <h1>{cityname.displayedName}</h1>
        </Grid>
        <Grid sx={{ my: 2 }} size={{ xs: 12, sm: 6 }}>
          <h2>
            {" "}
            متبقي حتى صلاه {nextPrayersArray[nextPrayerIndex].displayedName}
          </h2>
          <h1>{remainingTime}</h1>
        </Grid>
      </Grid>
      <Divider
        variant="middle"
        style={{ borderColor: "white", opacity: "0.2" }}
      />
      {/** card prayer*/}

      <div className="grid   lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-2 my-4 ">
        {cardInfo.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: index, delay: index / 2 }}>
            <CardPrayer title={card.title} time={card.time} img={card.img} />
          </motion.div>
        ))}
      </div>

      {/** select city */}
      <Stack direction="row" justifyContent={"center"} sx={{ mt: 2 }}>
        <FormControl sx={{ width: "50%", bgcolor: "black" }}>
          <InputLabel id="demo-simple-select-label">
            {cityname.displayedName}
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="City"
            onChange={handleChange}>
            {cities &&
              cities.map((city, index) => (
                <MenuItem
                  key={index}
                  value={{
                    displayedName: city.arabic,
                    apiname: city.english,
                  }}>
                  {city.arabic}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Stack>
    </motion.div>
  );
}
