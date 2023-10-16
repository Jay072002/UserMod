import React, { createContext, useState } from "react";

// Create a context
export const MyContext = createContext();

export const MyContextProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });

  const [accordionItems, setAccordianItems] = useState([
    {
      title: "Accordion 1",
      street: "",
      city: "",
      state: "",
      zipCode: "",
    },
  ]);

  return (
    <MyContext.Provider
      value={{ userProfile, setUserProfile, accordionItems, setAccordianItems }}
    >
      {children}
    </MyContext.Provider>
  );
};
