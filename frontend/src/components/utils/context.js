"use client";

import axios from "axios";

const { createContext, useState, useEffect } = require("react");

export const RecordContext = createContext(null);

export const RecordContextProvider = ({ children }) => {
  const [records, setRecords] = useState([]);
  const [type, setType] = useState("all");
  const [hiddenCategories, setHiddenCategories] = useState([]);

  const getData = async () => {
    const response = await axios?.get("http://localhost:3001/records", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setRecords(response.data);
  };

  const toggleCategory = (id) => {
    if (hiddenCategories.includes(id)) {
      setHiddenCategories((prev) => prev.filter((item) => item !== id));
    } else {
      setHiddenCategories((prev) => [...prev, id]);
    }
    console.log(hiddenCategories);
  };

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
        toggleCategory,
        hiddenCategories,
        setHiddenCategories,
        getData,
      }}
    >
      {children}
    </RecordContext.Provider>
  );
};
