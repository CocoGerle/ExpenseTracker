import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import {
  Dialog,
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
import { AddCategory } from "@/assets/icons/AddCategory";
import { Home } from "@/assets/icons/Home";
import { GiftIcon } from "@/assets/icons/GiftIcon";
import { Food } from "@/assets/icons/Food";
import { WineIcon } from "@/assets/icons/WineIcon";
import { TaxiIcon } from "@/assets/icons/TaxiIcon";
import { ShoppingIcon } from "@/assets/icons/ShoppingIcon";
import { Textarea } from "@/components/ui/textarea";
import { DatePickerDemo } from "./Date";
import { RandomIcon } from "@/assets/icons/RandomIcon";
import { RandomIcon2 } from "@/assets/icons/RandomIcon2";
import { RandomIcon3 } from "@/assets/icons/RandomIcon3";


const categories = [
  { title: "Food & Drinks" },
  { title: "Shopping" },
  { title: "Housing" },
  { title: "Transportation" },
  { title: "Vehicle" },
  { title: "Life & Entertainment" },
  { title: "Communication, PC" },
  { title: "Financial expenses" },
  { title: "Investments" },
  { title: "Income" },
  { title: "Others" },
];

const icons = [
  { icon: RandomIcon },
  { icon: RandomIcon2 },
  { icon: RandomIcon3 },
  { icon: RandomIcon },
  { icon: RandomIcon2 },
  { icon: RandomIcon3 },
  { icon: RandomIcon },
  { icon: RandomIcon2 },
  { icon: RandomIcon3 },
  { icon: RandomIcon },
  { icon: RandomIcon2 },
  { icon: RandomIcon3 },
  { icon: RandomIcon },
  { icon: RandomIcon2 },
  { icon: RandomIcon3 },
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

const minValue = 0;
const maxValue = 1000;

export const Records = (bla) => {
  const [values, setValues] = useState([minValue, maxValue]);
  const [activeButton, setActiveButton] = useState("expense");
  const [bgColor, setBgColor] = useState("black");

  const handleInputChange = (index, newValue) => {
    const newValues = [...values];
    newValues[index] = Number(newValue);
    setValues(newValues);
  };

  const handleButtonClick = (button) => {
    setActiveButton(button);
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
                      onClick={() => handleButtonClick("expense")}
                    >
                      Expense
                    </div>
                    <div
                      className={`py-2 px-14 absolute top-0 left-40 rounded-r-3xl transition-colors ${
                        activeButton === "income"
                          ? "bg-green-600 text-white z-10 rounded-l-3xl"
                          : "bg-gray-200"
                      }`}
                      onClick={() => handleButtonClick("income")}
                    >
                      Income
                    </div>
                  </div>
                  <div className="py-3 px-4 bg-gray-200 border rounded-lg mt-5">
                    <p>Amount</p>
                    <h1 className="text-gray-500">₮ 000.00</h1>
                  </div>
                  <div className="w-full mt-5">
                    <h1 className="mb-1">Category</h1>
                    <Select>
                      <SelectTrigger className="">
                        <SelectValue placeholder="Choose" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="addCategory">
                          <div className="flex justify-around gap-3">
                            <AddCategory />
                            <h1>Add Category</h1>
                          </div>
                        </SelectItem>
                        <SelectItem value="home">
                          <div className="flex gap-3">
                            <Home />
                            <h1>Home</h1>
                          </div>
                        </SelectItem>
                        <SelectItem value="gift">
                          <div className="flex gap-3">
                            <GiftIcon />
                            <h1>Gift</h1>
                          </div>
                        </SelectItem>
                        <SelectItem value="food">
                          <div className="flex gap-3">
                            <Food />
                            <h1>Food</h1>
                          </div>
                        </SelectItem>
                        <SelectItem value="drink">
                          <div className="flex gap-3">
                            <WineIcon />
                            <h1>Drink</h1>
                          </div>
                        </SelectItem>
                        <SelectItem value="taxi">
                          <div className="flex gap-3">
                            <TaxiIcon />
                            <h1>Taxi</h1>
                          </div>
                        </SelectItem>
                        <SelectItem value="shopping">
                          <div className="flex gap-3">
                            <ShoppingIcon />
                            <h1>Shopping</h1>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex mt-5 w-[100%] gap-4">
                    <div className="w-[50%] flex flex-col">
                      {/* <h1>Date</h1> */}
                      Date
                      <DatePickerDemo />
                    </div>
                    <div className="w-[50%] flex flex-col">
                      <label>Time</label>
                      <input
                        type="time"
                        className="border rounded-md py-[6px] px-[8px]"
                      />
                    </div>
                  </div>
                  <div className={`mt-[20px]`}>
                    <Button
                      className={`bg-blue-600 text-white rounded-3xl w-full ${
                        activeButton === "income"
                          ? "bg-green-600 text-white z-10 rounded-l-3xl"
                          : "bg-blue-600"
                      }`}
                    >
                      Add Records
                    </Button>
                  </div>
                </div>

                <div className="w-96 py-5 px-6 h-fit">
                  <div>
                    <div className="mb-2">Payee</div>
                    <Input type="text" placeholder="Write here" />
                  </div>
                  <div>
                    <div className="mt-5 mb-2">Note</div>
                    <Textarea className="h-60" placeholder="Write here" />
                  </div>
                </div>
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <Input type="search" placeholder="Search" />
      <div>
        <h1 className="mb-3 text-lg text-gray-800">Types</h1>
        <RadioGroup className="py-2 px-3" defaultValue="option-one">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-one" id="option-one" />
            <h1>All</h1>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-two" id="option-two" />
            <h1>Income</h1>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-three" id="option-three" />
            <h1>Expense</h1>
          </div>
        </RadioGroup>
      </div>
      <div>
        <div className="flex justify-between mb-5">
          <h1 className="font-semibold">Category</h1>
          <h1 className="text-gray-400">Clear</h1>
        </div>
        <div className="flex flex-col gap-2 text-gray-800">
          {categories.map((item, index) => (
            <div className="flex justify-between items-center" key={index}>
              <div className="flex items-center gap-2">
                <img className="h-4 w-5" src="Union.png" alt="Icon" />
                <p>{item.title}</p>
              </div>
              <img
                className="w-1.5 h-1"
                src="arrow_drop_down.png"
                alt="Dropdown Icon"
              />
            </div>
          ))}
          <div className="flex items-center gap-2">
            <img className="h-5 w-5" src="Leading.png" alt="Icon" />

            <Dialog>
              <DialogTrigger>Category</DialogTrigger>
              <DialogContent className="w-[400px]">
                <DialogTitle>Add Record</DialogTitle>
                <div className="flex gap-[8px]">
                  <Select>
                    <SelectTrigger className="w-[20%]">
                      <SelectValue  placeholder={RandomIcon2 } />
                    </SelectTrigger>
                    <SelectContent className="w-fit p-0 border">
                      <div className="grid grid-cols-5 gap-[24px]">
                        {icons.map((item, index) => {
                          const Icon = item.icon;
                          return (
                            <SelectItem className="w-fit p-0" value={index}>
                              <div>
                                <Icon color={bgColor} />
                              </div>
                            </SelectItem>
                          );
                        })}
                      </div>
                      <div className="flex gap-2">
                        {colors.map((item, index) => (
                          <div
                            className={`w-[24px] h-[24px] rounded-full`}
                            style={{ backgroundColor: item.color }}
                            onClick={() => {
                              setBgColor(item.color);
                            }}
                          ></div>
                        ))}
                      </div>
                    </SelectContent>
                  </Select>

                  <Select>
                    <SelectTrigger className="w-[80%]">
                      <SelectValue placeholder="Name" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="bg-green-600 hover:bg-green-400 rounded-3xl">
                  Add Category
                </Button>
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
