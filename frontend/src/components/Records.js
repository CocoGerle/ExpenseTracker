import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { useContext, useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { RecordContext } from "./utils/context";
import * as IconsFa from "react-icons/fa";
import { FoodIcon } from "@/assets/icons/FoodIcon";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { SearchBar } from "./SearchBar";
import { api } from "./lib/axios";

const icons1 = [
  { icon: "FaHome" },
  { icon: "FaGift" },
  { icon: "FaMugHot" },
  { icon: "FaTaxi" },
  { icon: "FaShoppingBag" },
];

const colors = [
  { color: "#0166FF" },
  { color: "#01B3FF" },
  { color: "#41CC00" },
  { color: "#F9D100" },
  { color: "#FF7B01" },
  { color: "#AE01FF" },
  { color: "#FF0101" },
];

export const Records = () => {
  // const [values, setValues] = useState([minValue, maxValue]);
  const [activeButton, setActiveButton] = useState("expense");
  const [bgColor, setBgColor] = useState("black");
  const [categories, setCategories] = useState([]);

  const {
    record,
    setRecord,
    category,
    setCategory,
    records,
    setRecords,
    type,
    setType,
    hiddenCategories,
    setHiddenCategories,
    toggleCategory,
    getData,
    values,
    setValues,
    maxValue,
    minValue,
  } = useContext(RecordContext);

  const handleInputChange = (index, newValue) => {
    const newValues = [...values];
    newValues[index] = Number(newValue);
    setValues(newValues);
  };

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  const createRecord = async () => {
    const response = await api.post(`/records`, record, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    getData();
  };

  useEffect(() => {
    getData();
  }, []);

  const createCategory = async () => {
    const response = await api.post(`/category`, category, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    getData1();
  };
  const getData1 = async () => {
    const response = await api.get("/category", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setCategories(response.data);
  };
  useEffect(() => {
    getData1();
  }, []);

  const deleteCategory = async (id) => {
    const response = await api.delete(`/category/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setCategories(categories.filter((category) => category.id !== id));
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-semibold">Records</h1>
        <Dialog>
          <DialogTrigger className="bg-blue-600 text-white rounded-xl py-2 px-4">
            + Add
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Record</DialogTitle>
              <div className="flex py-5 px-6">
                <div className="flex flex-col w-80 mr-8">
                  <div className="flex relative">
                    <div
                      className={`py-2 px-14 rounded-3xl z-10 transition-colors ${
                        activeButton === "expense"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 rounded-r-none"
                      }`}
                      onClick={() => {
                        handleButtonClick("expense"),
                          setRecord({ ...record, type: "exp" });
                      }}
                    >
                      Expense
                    </div>
                    <div
                      className={`py-2 px-14 absolute top-0 left-40 rounded-r-3xl transition-colors ${
                        activeButton === "income"
                          ? "bg-green-600 text-white z-10 rounded-l-3xl"
                          : "bg-gray-200"
                      }`}
                      onClick={() => {
                        handleButtonClick("income"),
                          setRecord({ ...record, type: "inc" });
                      }}
                    >
                      Income
                    </div>
                  </div>
                  <div className="py-3 px-4 bg-gray-200 border rounded-lg mt-5">
                    <p>Amount</p>
                    <Input
                      className="text-gray-500"
                      type="number"
                      // placeholder="₮ 000.00"
                      onChange={(event) =>
                        setRecord({
                          ...record,
                          amount: Number(event.target.value),
                        })
                      }
                    />
                  </div>
                  <div className="w-full mt-5">
                    <h1 className="mb-1">Category</h1>
                    <Select
                      onValueChange={(event) =>
                        setRecord({
                          ...record,
                          categoryId: event.id,
                        })
                      }
                    >
                      <SelectTrigger className="">
                        <SelectValue placeholder="Choose" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((item, index) => {
                          const Icon = IconsFa[item.icon];
                          return (
                            <SelectItem
                              key={index}
                              className="w-full p-0"
                              value={item}
                            >
                              <div className="flex gap-3 p-[16px]">
                                {Icon ? (
                                  <Icon color={item.color} size={24} />
                                ) : (
                                  <FoodIcon />
                                )}
                                {item.name}
                              </div>
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex mt-5 w-[100%] gap-4">
                    <div className="w-[50%] flex flex-col">
                      Date
                      <input
                        type="date"
                        placeholder="date"
                        value={record.date}
                        onChange={(event) =>
                          setRecord({ ...record, date: event.target.value })
                        }
                      />
                    </div>
                    <div className="w-[50%] flex flex-col">
                      <label>Time</label>
                      <input
                        type="time"
                        placeholder="time"
                        className="border rounded-md py-[6px] px-[8px]"
                        value={record.time}
                        onChange={(event) =>
                          setRecord({ ...record, time: event.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className={`mt-[20px]`}>
                    <DialogClose>
                      <Button
                        onClick={createRecord}
                        className={`bg-blue-600 text-white rounded-3xl w-full ${
                          activeButton === "income"
                            ? "bg-green-600 text-white z-10 rounded-l-3xl"
                            : "bg-blue-600"
                        }`}
                      >
                        Add Records
                      </Button>
                    </DialogClose>
                  </div>
                </div>

                <div className="w-96 py-5 px-6 h-fit">
                  <div>
                    <div className="mb-2">Payee</div>
                    <Input
                      type="text"
                      placeholder="Write here"
                      value={record.payee}
                      onChange={(event) =>
                        setRecord({ ...record, payee: event.target.value })
                      }
                    />
                  </div>
                  <div>
                    <div className="mt-5 mb-2">Note</div>
                    <Textarea
                      className="h-60"
                      placeholder="Write here"
                      value={record.note}
                      onChange={(event) =>
                        setRecord({ ...record, note: event.target.value })
                      }
                    />
                  </div>
                </div>
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <div>
        {/* <input
          value={input}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="search"
          className="h-10 w-full rounded-xl p-3 border"
        /> */}
      </div>
      <div>
        <h1 className="mb-3 text-lg text-gray-800">Types</h1>
        <RadioGroup
          className="py-2 px-3"
          defaultValue="all"
          onValueChange={(value) => {
            setType(value);
          }}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="all" id="option-one" />
            <h1>All</h1>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="inc" id="option-two" />
            <h1>Income</h1>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="exp" id="option-three" />
            <h1>Expense</h1>
          </div>
        </RadioGroup>
      </div>
      <div>
        <div className="flex justify-between mb-5">
          <h1 className="font-semibold">Category</h1>
          <h1
            className="text-gray-400 hover:text-gray-700 cursor-pointer"
            onClick={() => {
              setHiddenCategories([]);
            }}
          >
            Clear
          </h1>
        </div>
        <div className="flex flex-col gap-2 text-gray-800">
          {categories?.map((item, index) => (
            <div className="flex justify-between items-center" key={index}>
              <div
                onClick={() => toggleCategory(item.id)}
                className="flex items-center gap-2"
              >
                {hiddenCategories.includes(item.id) ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
                <p>{item.name}</p>
              </div>
              <div
                onClick={() => {
                  deleteCategory(item.id);
                }}
              >
                <div className="hover:text-red-600 cursor-pointer">
                  <MdDeleteOutline />
                </div>
              </div>
            </div>
          ))}
          <div className="flex items-center gap-2">
            <img className="h-5 w-5" src="Leading.png" alt="Icon" />

            <Dialog>
              <DialogTrigger>Category</DialogTrigger>
              <DialogContent className="w-[400px]">
                <DialogTitle>Add Record</DialogTitle>
                <div className="flex gap-[8px]">
                  <Select
                    onValueChange={(value) => {
                      setCategory((prev) => ({ ...prev, icon: value }));
                    }}
                  >
                    <SelectTrigger className="w-[20%]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="w-fit p-0 border">
                      <div className="grid grid-cols-5 gap-[24px]">
                        {icons1.map((item, index) => {
                          const Icon = IconsFa[item.icon];
                          return (
                            <SelectItem
                              key={index}
                              className="w-fit p-0"
                              value={item.icon}
                            >
                              <div value={item}>
                                <Icon color={bgColor} size={24} />
                              </div>
                            </SelectItem>
                          );
                        })}
                      </div>
                      <div className="flex gap-2 mt-4">
                        {colors.map((item, index) => (
                          <div
                            key={index}
                            className="w-[24px] h-[24px] rounded-full"
                            style={{ backgroundColor: item.color }}
                            onClick={() => {
                              setBgColor(item.color);
                              setCategory({
                                ...category,
                                color: item.color,
                              });
                            }}
                          ></div>
                        ))}
                      </div>
                    </SelectContent>
                  </Select>
                  <input
                    placeholder="name"
                    onChange={(event) =>
                      setCategory((prev) => ({
                        ...prev,
                        name: event.target.value,
                      }))
                    }
                  ></input>
                </div>
                <DialogClose>
                  <Button
                    onClick={createCategory}
                    className="bg-green-600 hover:bg-green-400 rounded-3xl"
                  >
                    Add Category
                  </Button>
                </DialogClose>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h1>Amount Range</h1>
        <div className="flex gap-2">
          <Input
            type="number"
            placeholder={values[0].toString()}
            onChange={(e) => handleInputChange(0, e.target.value)}
          />
          <Input
            type="number"
            placeholder={values[1].toString()}
            onChange={(e) => handleInputChange(1, e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Slider
            value={values}
            onValueChange={(newValues) => setValues(newValues)}
            max={maxValue}
            min={minValue}
            step={50}
            className="w-[90%]"
          />
          <div className="flex justify-between">
            <span>{values[0]}</span>
            <span>{values[1]}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
