"use client";
import { Checkbox } from "./ui/checkbox";
import { useState, useEffect } from "react";

export const Cards = ({
  name,
  date,
  time,
  amount,
  icon,
  type,
  id,
  deleteRecordsArr,
  isDeleted,
}) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckedChange = (checked) => {
    setIsChecked(checked);
    if (checked) {
      deleteRecordsArr.push(id);
    } else {
      const indexToRemove = deleteRecordsArr.findIndex((item) => item === id);
      if (indexToRemove !== -1) {
        deleteRecordsArr.splice(indexToRemove, 1);
      }
    }
  };

  // Reset checkbox if the card is deleted
  useEffect(() => {
    if (isDeleted) {
      setIsChecked(false);
    }
  }, [isDeleted]);

  return (
    <div className="flex justify-between bg-white items-center px-6 py-3 rounded-lg">
      <div className="flex gap-4 items-center">
        <Checkbox
          height={5}
          width={5}
          checked={isChecked}
          onCheckedChange={handleCheckedChange}
        />
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
