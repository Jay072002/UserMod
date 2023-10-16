import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Header from "./pages/Header";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AddUserInfo from "./pages/AddUserInfo";
import { MyContextProvider } from "./context/context";

const root = ReactDOM.createRoot(document.getElementById("root"));

// App with outlets
const App = () => {
  return (
    <MyContextProvider>
      <Header />
      <Outlet />
    </MyContextProvider>
  );
};

// Router configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/addUserInfo",
        element: <AddUserInfo />,
      },
    ],
  },
]);

root.render(<RouterProvider router={router}></RouterProvider>);
