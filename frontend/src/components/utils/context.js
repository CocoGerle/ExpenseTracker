"use client";

const { createContext, useState } = require("react");

export const RecordContext = createContext(null);

export const RecordContextProvider = ({ children }) => {
  const [category, setCategory] = useState({
    name: "",
    icon: "",
    color: "",
  });
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
    <RecordContext.Provider
      value={{ record, setRecord, category, setCategory }}
    >
      {children}
    </RecordContext.Provider>
  );
};
