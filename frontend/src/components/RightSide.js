"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";

import { Checkbox } from "@/components/ui/checkbox";
import { Cards } from "./Cards";
import { useState, useEffect, useContext } from "react";
import { RecordContext } from "./utils/context";
import * as IconsFa from "react-icons/fa";
import { FoodIcon } from "@/assets/icons/FoodIcon";
import { MdDeleteOutline } from "react-icons/md";
import { SearchBar } from "./SearchBar";
import { isYesterday } from "date-fns";

export const RightSide = () => {
  const {
    records,
    setRecords,
    type,
    hiddenCategories,
    getData,
    values,
    maxValue1,
    minValue1,
  } = useContext(RecordContext);

  const [filteredType, setFilteredType] = useState([]);
  const [deleteRecordsArr, setDeleteRecordsArr] = useState([]);
  const [checkedRecords, setCheckedRecords] = useState({});
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [sortOrder, setSortOrder] = useState("Newest first");
  const [filterSearchRecords, setFilterSearchRecords] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [dateRecords, setDateRecords] = useState([]);
  const [yesterday, setYesterday] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const a = records
    .filter((record) => {
      if (type === "all") return true;
      if (type === "inc" && record.type === "inc") return true;
      if (type === "exp" && record.type === "exp") return true;
      return false;
    })
    .filter(
      (record) => record.amount >= minValue1 && record.amount <= maxValue1
    )
    .filter((record) => !hiddenCategories.includes(record.categoryId))
    .filter(
      (record) =>
        record.payee?.includes(searchValue) ||
        record.amount?.toString().includes(searchValue) ||
        record.category?.name?.toString().includes(searchValue)
    )
    .sort((a, b) => {
      if (sortOrder === "Newest first" || sortOrder === "Oldest first") {
        const dateA = new Date(a.date || "1900-01-01");
        const dateB = new Date(b.date || "1900-01-01");
        if (sortOrder === "Newest first") {
          return dateB - dateA;
        } else {
          return dateA - dateB;
        }
      } else if (
        sortOrder === "Highest first" ||
        sortOrder === "Lowest first"
      ) {
        const amountA = a.amount || 0;
        const amountB = b.amount || 0;
        if (sortOrder === "Highest first") {
          return amountB - amountA;
        } else {
          return amountA - amountB;
        }
      }
      return 0;
    });
  let currentDate = new Date().toJSON().slice(0, 10);
  const filterByType = () => {
    setFilteredType(a);
    setDateRecords(
      a.filter(
        (record) => currentDate !== record.date && !isYesterday(record.date)
      )
    );
    setYesterday(a.filter((record) => isYesterday(record.date)));
  };

  useEffect(() => {
    filterByType();
  }, [
    records,
    type,
    hiddenCategories,
    sortOrder,
    searchValue,
    minValue1,
    maxValue1,
  ]);

  const calculateTotalAmount = (records) => {
    return records.reduce((total, record) => {
      const amount = parseFloat(record.amount);
      return total + (record.type === "exp" ? -amount : amount);
    }, 0);
  };

  const totalAmount = calculateTotalAmount(filteredType);

  const deleteRecords = async (ids) => {
    try {
      await Promise.all(
        ids.map((id) =>
          axios.delete(`http://localhost:3006/records/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
        )
      );

      setFilteredType((prevRecords) =>
        prevRecords.filter((record) => !ids.includes(record.id))
      );
      setDateRecords((prevRecords) =>
        prevRecords.filter((record) => !ids.includes(record.id))
      );
      setYesterday((prevRecords) =>
        prevRecords.filter((record) => !ids.includes(record.id))
      );

      setCheckedRecords((prevChecked) => {
        const updatedChecked = { ...prevChecked };
        ids.forEach((id) => {
          delete updatedChecked[id];
        });
        return updatedChecked;
      });

      setDeleteRecordsArr([]);
      setSelectAllChecked(false);
      console.log("Records deleted successfully");
    } catch (error) {
      console.error("Error deleting records:", error);
    }
  };

  const handleCheckboxChange = (id, checked) => {
    setCheckedRecords((prev) => ({ ...prev, [id]: checked }));
    setDeleteRecordsArr((prev) => {
      if (checked) {
        return [...prev, id];
      } else {
        return prev.filter((recordId) => recordId !== id);
      }
    });
  };

  return (
    <div>
      <div className="pt-[48px] pb-[16px] pl-[24px] flex justify-between">
        <div className="w-[160px] pl-[48px]">
          <Carousel>
            <CarouselContent>
              <CarouselItem>Last 10 Days</CarouselItem>
              <CarouselItem>Last 20 Days</CarouselItem>
              <CarouselItem>Last 30 Days</CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        <Select onValueChange={(value) => setSortOrder(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Newest first" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Newest first">Newest first</SelectItem>
            <SelectItem value="Oldest first">Oldest first</SelectItem>
            <SelectItem value="Highest first">Highest first</SelectItem>
            <SelectItem value="Lowest first">Lowest first</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-6 pl-[24px]">
        <div className="flex justify-between bg-white py-[12px] px-[24px] rounded-lg">
          <div className="flex gap-4">
            <div>
              <Checkbox height={5} width={5} />

              <div>Select all</div>
            </div>
          </div>
          <div
            className={`text-md ${
              totalAmount > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {totalAmount}$
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <SearchBar
            filterSearchRecords={filterSearchRecords}
            setFilterSearchRecords={setFilterSearchRecords}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
          <div className="flex justify-between">
            <div className="text-[16px] font-semibold">Today</div>
            <div
              className="flex items-center cursor-pointer"
              onClick={() => {
                deleteRecords(deleteRecordsArr);
              }}
            >
              Delete
              <div className="hover:text-red-600 cursor-pointer">
                <MdDeleteOutline size={24} />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {filteredType
              .filter((kk) => kk.date === currentDate)
              .map((item) => {
                const Icon = IconsFa[item.category?.icon];
                return (
                  <div key={item.id}>
                    <Cards
                      type={item.type}
                      name={item.category?.name}
                      amount={item.amount}
                      date={item.date}
                      time={item.time}
                      payee={item.payee}
                      id={item.id}
                      icon={
                        Icon ? (
                          <Icon color={item.category.color} size={24} />
                        ) : (
                          <FoodIcon />
                        )
                      }
                      deleteRecordsArr={deleteRecordsArr}
                      checked={checkedRecords[item.id] || false}
                      onCheckedChange={(checked) =>
                        handleCheckboxChange(item.id, checked)
                      }
                    />
                  </div>
                );
              })}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="text-[16px] font-semibold">Yesterday</div>
          <div>
            <div className="flex flex-col gap-3">
              {yesterday.map((item) => {
                const Icon = IconsFa[item.category?.icon];
                return (
                  <div key={item.id}>
                    <Cards
                      type={item.type}
                      name={item.category?.name}
                      amount={item.amount}
                      date={item.date}
                      time={item.time}
                      payee={item.payee}
                      id={item.id}
                      icon={
                        Icon ? (
                          <Icon color={item.category.color} size={24} />
                        ) : (
                          <FoodIcon />
                        )
                      }
                      deleteRecordsArr={deleteRecordsArr}
                      checked={checkedRecords[item.id] || false}
                      onCheckedChange={(checked) =>
                        handleCheckboxChange(item.id, checked)
                      }
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col gap-3"></div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="text-[16px] font-semibold">Others</div>
          <div>
            <div className="flex flex-col gap-3">
              {dateRecords.map((item) => {
                const Icon = IconsFa[item.category?.icon];
                return (
                  <div key={item.id}>
                    <Cards
                      type={item.type}
                      name={item.category?.name}
                      amount={item.amount}
                      date={item.date}
                      time={item.time}
                      payee={item.payee}
                      id={item.id}
                      icon={
                        Icon ? (
                          <Icon color={item.category.color} size={24} />
                        ) : (
                          <FoodIcon />
                        )
                      }
                      deleteRecordsArr={deleteRecordsArr}
                      checked={checkedRecords[item.id] || false}
                      onCheckedChange={(checked) =>
                        handleCheckboxChange(item.id, checked)
                      }
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col gap-3"></div>
        </div>
      </div>
    </div>
  );
};
