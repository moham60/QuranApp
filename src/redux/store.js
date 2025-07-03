import { configureStore } from "@reduxjs/toolkit";
import { QuranReducer } from "./feature/Quran";


export  const store = configureStore({
    reducer: {
        Quran: QuranReducer,
    },
   
})