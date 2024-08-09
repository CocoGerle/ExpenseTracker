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
import { HomeIcon } from "@/assets/icons/HomeIcon";
import { FoodIcon } from "@/assets/icons/FoodIcon";

export const RightSide = () => {
  const { record, setRecord, records, setRecords, type, setType } =
    useContext(RecordContext);
  const [filteredType, setFilteredType] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get("http://localhost:3001/records");
      setRecords(response.data);
    };
    getData();
  }, []);

  const filterByType = () => {
    setFilteredType(
      records.filter((record) => {
        if (type === "all") return true;
        if (type === "inc" && record.type === "inc") return true;
        if (type === "exp" && record.type === "exp") return true;
        return false;
      })
    );
  };
  useEffect(() => {
    filterByType();
  }, [records, type]);

  const calculateTotalAmount = (records) => {
    return records.reduce((total, record) => {
      const amount = parseFloat(record.amount);
      return total + (record.type === "exp" ? -amount : amount);
    }, 0);
  };

  const totalAmount = calculateTotalAmount(records);

  return (
    <div>
      <div className=" pt-[48px] pb-[16px] pl-[24px] flex justify-between ">
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

        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Newest first" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Newest first</SelectItem>
            <SelectItem value="dark">Oldest first</SelectItem>
            <SelectItem value="system">Si si ma</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className=" flex flex-col gap-6 pl-[24px]">
        <div className="flex justify-between bg-white py-[12px] px-[24px] rounded-lg ">
          <div className="flex gap-4 ">
            <div>
              <Checkbox height={5} width={5} />
            </div>
            <div>Select all</div>
          </div>
          <div
            className={`text-md ${
              totalAmount > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {totalAmount}$
          </div>
        </div>
        <div className="flex flex-col gap-3 ">
          <div className="text-[16px] font-semibold">Today</div>
          <div className="flex flex-col gap-3 ">
            {filteredType.map((item) => {
              const Icon = IconsFa[item.category?.icon];
              return (
                <div>
                  <Cards
                    type={item.type}
                    name={item.category.name}
                    amount={item.amount}
                    date={item.date}
                    time={item.time}
                    icon={
                      Icon ? (
                        <Icon color={item.category.color} size={24} />
                      ) : (
                        <FoodIcon />
                      )
                    }
                  ></Cards>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col gap-3 ">
          <div className="text-[16px] font-semibold">Yesterday</div>
          <div className="flex flex-col gap-3 "></div>
        </div>
      </div>
    </div>
  );
};
