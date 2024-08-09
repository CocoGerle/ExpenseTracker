"use client";
import { Checkbox } from "./ui/checkbox";
import * as IconsFa from "react-icons/fa";

export const Cards = ({ name, date, time, amount, icon, type }) => {
  return (
    <div className="flex justify-between bg-white items-center px-6 py-3 rounded-lg">
      <div className="flex gap-4 items-center">
        <Checkbox height={5} width={5} />
        <div className="flex items-center gap-[16px]">
          <div>
            <div>{icon}</div>
          </div>
          <div className="flex flex-col">
            <div>{name}</div>
            <div className="text-[12px] text-[#6B7280]">
              {date} {time}
            </div>
          </div>
        </div>
      </div>
      <div
        className={`${type === "exp" ? "text-[#F54949]" : "text-[#23E01F]"}`}
      >
        {type === "exp" ? -amount : amount}
      </div>
    </div>
  );
};
