import "./App.css";
import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createHashRouter, RouterProvider } from "react-router";
import Layout from "./Components/Layout/Layout";

// Lazy load جميع الصفحات
const GetSura = lazy(() => import("./Pages/getSura/GetSura"));
const SpecificSura = lazy(() =>
  import("./Pages/GetSpecificSura/SpecificSura")
);
const Search = lazy(() => import("./Pages/Search/Search"));
const Azkar = lazy(() => import("./Pages/Azkar/Azkar"));
const PrayerTimes = lazy(() =>
  import("./Pages/getPrayerTime/PrayerTimes")
);
const Qubila = lazy(() => import("./Pages/GetQuibla/Qubila"));
const Questions = lazy(() => import("./Pages/Questions/Questions"));
const Ayam = lazy(() => import("./Pages/Ayam/Ayam"));

import { Provider } from "react-redux";
import { store } from "./redux/store";
import ScrollTop from "./Components/ScrollTop/ScrollTop";
import { Toaster } from "react-hot-toast";
import Spinner from "./Components/Spinner/Spinner";

const client = new QueryClient({});

// Router مع Suspense
const route = createHashRouter([
  {
    path: "",
    element: <Layout />,
    children: [
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
        element: (
          <Suspense fallback={<Spinner/>}>
            <SpecificSura />
          </Suspense>
        ),
      },
      {
        path: "/search",
        element: (
          <Suspense fallback={<div>Loading Search...</div>}>
            <Search />
          </Suspense>
        ),
      },
      {
        path: "/azkar",
        element: (
          <Suspense fallback={<div>Loading Azkar...</div>}>
            <Azkar />
          </Suspense>
        ),
      },
      {
        path: "/prayerTime",
        element: (
          <Suspense fallback={<div>Loading Prayer Times...</div>}>
            <PrayerTimes />
          </Suspense>
        ),
      },
      {
        path: "/qibla",
        element: (
          <Suspense fallback={<div>Loading Qibla Direction...</div>}>
            <Qubila />
          </Suspense>
        ),
      },
      {
        path: "/questions",
        element: (
          <Suspense fallback={<div>Loading Questions...</div>}>
            <Questions />
          </Suspense>
        ),
      },
      {
        path: "/ayam",
        element: (
          <Suspense fallback={<div>Loading Ayam...</div>}>
            <Ayam />
          </Suspense>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <ScrollTop />
      <QueryClientProvider client={client}>
        <RouterProvider router={route} />
      </QueryClientProvider>
      <Toaster />
    </Provider>
  );
}

export default App;
