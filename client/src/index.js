import React, { useContext } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Header from "./pages/Header";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AddUserInfo from "./pages/AddUserInfo";
import { MyContext, MyContextProvider } from "./context/context";
import UpdateUserInfo from "./pages/UpdateUserInfo";

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
        path: "/home",
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
      {
        path: "updateuserinfo/:userId",
        element: <UpdateUserInfo />,
      },
    ],
  },
]);

root.render(<RouterProvider router={router}></RouterProvider>);
