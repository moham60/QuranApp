import "./App.css";
import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createHashRouter, RouterProvider } from "react-router";
import Layout from "./Components/Layout/Layout";

const GetSura = lazy(() => import("./Components/getSura/GetSura"));
import SpecificSura from "./Components/GetSpecificSura/SpecificSura";
import Search from "./Components/Search/Search";
import Azkar from "./Components/Azkar/Azkar";
import PrayerTimes from "./Components/getPrayerTime/PrayerTimes";

import { Provider } from "react-redux";
import { store } from "./redux/store";
import ScrollTop from "./Components/ScrollTop/ScrollTop";
import Qubila from "./Components/GetQuibla/Qubila";
import Questions from "./Components/Questions/Questions";
import { Toaster } from "react-hot-toast";
import Ayam from "./Components/Ayam/Ayam";



const client = new QueryClient({});

const route = createHashRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        path: "/prayerTime",
        element: <PrayerTimes />,
      },

      {
        path: "/",
        element: (
          <Suspense fallback={<div>Loading Surah...</div>}>
            <GetSura />
          </Suspense>
        ),
      },
      {
        path: "/sura/:number",
        element: <SpecificSura />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/azkar",
        element: <Azkar />,
      },
      {
        path: "/qibla",
        element: <Qubila />,
      },
      {
        path: "/questions",
        element: <Questions />,
      },
      {
        path: "/ayam",
        element: <Ayam />,
      },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <ScrollTop />
      <QueryClientProvider client={client}>
        <RouterProvider router={route}></RouterProvider>
      </QueryClientProvider>
      <Toaster />
    </Provider>
  );
}

export default App;
