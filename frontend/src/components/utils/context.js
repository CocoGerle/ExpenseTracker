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
      icon: "",
      color: "",
    },
    date: "",
    time: "",
    note: "",
    payee: "",
  });
  const [records, setRecords] = useState([]);
  const [type, setType] = useState("all");
  return (
    <RecordContext.Provider
      value={{
        record,
        setRecord,
        category,
        setCategory,
        records,
        setRecords,
        type,
        setType,
      }}
    >
      {children}
    </RecordContext.Provider>
  );
};
