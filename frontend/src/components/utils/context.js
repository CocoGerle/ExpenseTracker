"use client";

const { createContext, useState } = require("react");

export const RecordContext = createContext(null);

export const RecordContextProvider = ({ children }) => {
  const [record, setRecord] = useState({
    type: "exp",
    amount: "",
    category: {
      name: "",
      img: "",
      color: "",
    },
    date: "",
    time: "",
    note: "",
    payee: "",
  });
  return (
    <RecordContext.Provider value={{ record, setRecord }}>
      {children}
    </RecordContext.Provider>
  );
};
