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

import { Checkbox } from "@/components/ui/checkbox";
import { Cards } from "./Cards";

const data = [
  {
    title: "Lending & Renting",
    date: "14:00",
    amount: -1000,
  },
  {
    title: "Food & Drinks",
    time: "14:00",
    amount: 1000,
  },
  {
    title: "Food & Drinks",
    time: "14:00",
    amount: -1000,
  },
  {
    title: "Food & Drinks",
    time: "14:00",
    amount: 1000,
  },
  {
    title: "Food & Drinks",
    time: "14:00",
    amount: -1000,
  },
];

export const RightSide = () => {
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
            {data.map((item) => (
              <Cards title={item.title} date={item.date} amount={item.amount} />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3 ">
          <div className="text-[16px] font-semibold">Yesterday</div>
          <div className="flex flex-col gap-3 ">
            {data.map((item) => (
              <Cards title={item.title} date={item.date} amount={item.amount} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
