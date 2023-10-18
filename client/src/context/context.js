import React, { createContext, useState } from "react";

// Create a context
export const MyContext = createContext();

export const MyContextProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    isAdmin: "",
  });

  const [userProfile, setUserProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
  });

  const [accordionItems, setAccordianItems] = useState([]);

  const [isLogin, setIsLogin] = useState(false);

  const [addUserButtonFlag, setAddUserButtonFlag] = useState(false);

  const [isDark, setIsDark] = useState(false);

  return (
    <MyContext.Provider
      value={{
        userProfile,
        setUserProfile,
        accordionItems,
        setAccordianItems,
        isLogin,
        setIsLogin,
        loggedInUser,
        setLoggedInUser,
        addUserButtonFlag,
        setAddUserButtonFlag,
        isDark,
        setIsDark,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
