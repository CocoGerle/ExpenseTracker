"use client";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import Link from "next/link";
import { useContext, useState } from "react";
import { useAuth } from "./utils/AuthProvider";
import Flower from "./FLower";
import "./style.css";

export const NavBar = () => {
  const { LogOut, user } = useAuth();
  const [flowers, setFlowers] = useState([]);

  const handleClick = () => {
    setFlowers((prevFlowers) => [...prevFlowers, <Flower key={Date.now()} />]);
  };
  return (
    <div className=" max-w-screen-2xl m-auto py-[16px] px-[120px] flex justify-between">
      <div className="flex items-center gap-[24px] text-[#0F172A] text-[16px]">
        <div className="w-[40px] h-[40px]">
          <img src="/Logo.png" />
        </div>
        {/* <Link target="blank" href={"/dashboard"}>
          <div
            className="text-black"
            style={{
              fontWeight: usePathname() === "/dashboard" ? "bold" : "normal",
            }}
          >
            Dashboard
          </div>
        </Link> */}

        <Link target="blank" href={"/"}>
          <div
            className="text-black"
            style={{
              fontWeight: usePathname() === "/" ? "bold" : "normal",
            }}
          >
            Records
          </div>
        </Link>
      </div>
      <div className="flex gap-[24px] items-center">
        <div className="flex flex-col items-center">
          Hi, {user?.name.toUpperCase()},{/* <Button>+ Records</Button> */}
          <button
            className="cursor-pointer hover:text-red-500"
            onClick={handleClick}
          >
            Click me for flowers!
            <div> {flowers}</div>
          </button>
        </div>
        <div>
          <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
            <img src="self-port.jpg" />
          </div>
        </div>
        <Link href={"/login"}>
          <div className="cursor-pointer hover:text-blue-600" onClick={LogOut}>
            {" "}
            Log Out
          </div>
        </Link>
      </div>
    </div>
  );
};
