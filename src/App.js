import React, { useEffect } from "react";
import DashBoard from "./pages/DashBoard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Video from "./pages/Video/Index";
import Settings from "./pages/Settings/Index";
import Create from "./pages/Settings/create/Index";
import Assign from "./pages/Settings/Assign/Index";
import Filtered from "./pages/Settings/Filter";
import RawData from "./pages/RaxData/Index";
import Login from "./pages/Login/Index";

const AUTH =
  localStorage.getItem("Type") == "Admin"
    ? [
        {
          path: "/",
          element: <Login />,
        },
        {
          path: "/dashboard",
          element: <DashBoard />,
        },
        {
          path: "/video",
          element: <Video />,
        },
        {
          path: "/raw-data",
          element: <RawData />,
        },
        {
          path: "/settings",
          element: <Settings />,
        },
        {
          path: "/settings/create",
          element: <Create />,
        },
        {
          path: "/settings/assign",
          element: <Assign />,
        },
        {
          path: "/settings/filter",
          element: <Filtered />,
        },
      ]
    : [
        {
          path: "/",
          element: <Login />,
        },
        {
          path: "/dashboard",
          element: <DashBoard />,
        },
        {
          path: "/video",
          element: <Video />,
        },
        {
          path: "/raw-data",
          element: <RawData />,
        },
      ];

function App() {
  return (
    <>
      {localStorage.getItem("Type") == "User" ? console.log("admin") : null}
      <BrowserRouter>
        <Routes>
          {AUTH.map((item) => (
            <Route exact={true} path={item.path} element={item.element} />
          ))}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
