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
import { useState, useEffect } from "react";

export const RightSide = () => {
  const [records, setRecords] = useState([{}]);
  useEffect(() => {
    const getData = async () => {
      const response = await axios.get("http://localhost:3001/records");
      setRecords(response.data);
    };
    getData();
  }, []);
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
          <div className="text-slate-400">-35,500₮</div>
        </div>
        <div className="flex flex-col gap-3 ">
          <div className="text-[16px] font-semibold">Today</div>
          <div className="flex flex-col gap-3 ">
            {records.map((item) => (
             <Cards amount={item.amount} date={item.date}></Cards>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3 ">
          <div className="text-[16px] font-semibold">Yesterday</div>
          <div className="flex flex-col gap-3 ">
          </div>
        </div>
      </div>
    </div>
  );
};
