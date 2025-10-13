import { createSlice } from "@reduxjs/toolkit";
import { message } from "react-message-popup";
const currentBookmarkAyat = JSON.parse(localStorage.getItem("BookMarkAyat"));

export const Quran = createSlice({
  name: "Quran",
  initialState: {
    currentBookmarkAyat: currentBookmarkAyat ? currentBookmarkAyat : [],
    currentSuras: [],
    isplaying: false,
    isOpenBookMark: false,
    numberOfSura: 1,
    nameOfSura: "",
    
  },
  reducers: {
    getspecificAyah(state, action) {
      console.log("Clciked");
      const targetAyah = document.querySelector(
        `div[data-ayah='${action.payload}']`
      );
     
      if (targetAyah) {
        targetAyah.scrollIntoView({ behavior: "smooth", block: "center" });
        targetAyah.style.cssText =
          "background-color:rgba(0, 230, 233,0.2);transform:scale(1.02);transition:all 1s ease; margin-top:100px;padding-top:40px";
        setTimeout(() => {
          targetAyah.style.backgroundColor = "";
          targetAyah.style.transform = "";
          targetAyah.style.marginTop = "35px";
          targetAyah.style.paddingTop = "20px";
        }, 3000);
      } else if (action.payload == "") {
        message.error("please enter number of verse", 2000);
      } else {
        message.error("please enter valid verse number", 2000);
      }
    },
    addAyahToBookmark(state, action) {
      state.currentBookmarkAyat.push({
        ...action.payload,
        addAt: new Date().toISOString(),
        numberSura: state.numberOfSura,
        nameOfSura: state.nameOfSura.replace(
          /[\u0617-\u061A\u064B-\u0652]/g,
          ""
        ),
      });
      console.log("payload", action.payload);
      localStorage.setItem(
        "BookMarkAyat",
        JSON.stringify(state.currentBookmarkAyat)
      );
    },
    deleteAyahFromBookMark(state, action) {
      console.log(action.payload);
      state.currentBookmarkAyat = state.currentBookmarkAyat.filter(
        (el) =>
          el.number !== action.payload.sura ||
          el.numberInSurah !== action.payload.aya
      );
      localStorage.setItem(
        "BookMarkAyat",
        JSON.stringify(state.currentBookmarkAyat)
      );
    },

    playPause(state, action) {
      state.isplaying = action.payload;
    },
    handleOpenAudio(state, action) {
      state.isplaying = action.payload;
    },
    getCurrentSurasForSpecificReciter(state, action) {
      state.currentSuras.push(action.payload);
    },
    setOpenBookMark(state, action) {
      state.isOpenBookMark = action.payload;
    },
    setNumofSura(state, action) {
      state.numberOfSura = action.payload;
    },
    setNameOfSura(state, action) {
      state.nameOfSura = action.payload;
    },
  },
});

export const QuranReducer = Quran.reducer;
export const {
  addAyahToBookmark,
  getspecificAyah,
  playPause,
  getCurrentSurasForSpecificReciter,
  setOpenBookMark,
  setNumofSura,
  setNameOfSura,
  deleteAyahFromBookMark,
  ayahInBookMarkOrNot,
} = Quran.actions;