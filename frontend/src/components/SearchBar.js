import axios from "axios";
import { useEffect, useState } from "react";
import { api } from "./lib/axios";

export const SearchBar = ({
  filterSearchRecords,
  setFilterSearchRecords,
  searchValue,
  setSearchValue,
}) => {
  useEffect(() => {
    api
      ?.get("/records", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setData(res.data);
        setFilterSearchRecords(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const [data, setData] = useState([]);

  const filterFunction = (event) => {
    const searchValueo = event.target.value.toLowerCase();
    setSearchValue(searchValueo);

    if (searchValue === "") {
      setFilterSearchRecords(data);
    } else {
      const aa = data.filter((d) =>
        d.payee.toLowerCase().includes(searchValue)
      );
      setFilterSearchRecords(aa);
    }
  };
  return (
    <div>
      <input
        className="h-10 w-200 rounded-lg border p-2"
        placeholder="search"
        type="text"
        onChange={filterFunction}
      />
      {/* <div>
        {filterSearchRecords?.map((item, index) => (
          <div key={index}>{item.category.name}</div>
        ))}
      </div> */}
    </div>
  );
};
