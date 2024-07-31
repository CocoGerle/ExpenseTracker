"use client";

import { FoodIcon } from "@/assets/icons/FoodIcon";
import { Checkbox } from "./ui/checkbox";
import { HomeIcon } from "@/assets/icons/HomeIcon";

export const Cards = ({ title, date, amount }) => {
  return (
    <div className="flex justify-between bg-white items-center px-6 py-3 rounded-lg">
      <div className="flex gap-4 items-center">
        <Checkbox height={5} width={5} />
       
        <div>{title === "Food & Drinks" ? <FoodIcon /> : <HomeIcon />}</div>
        <div>
          <div>{title}</div>
          <div>{date}</div>
        </div>
      </div>
      <div className={`${amount > 0 ? "text-[#23E01F]" : "text-[#F54949]"}`}>
        {amount}₮
      </div>
    </div>
  );
};
