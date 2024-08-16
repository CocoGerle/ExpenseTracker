"use client";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import Link from "next/link";
import { useContext } from "react";
import { useAuth } from "./utils/AuthProvider";

export const NavBar = () => {
  const { LogOut } = useAuth();
  return (
    <div className=" max-w-screen-2xl m-auto py-[16px] px-[120px] flex justify-between">
      <div className="flex items-center gap-[24px] text-[#0F172A] text-[16px]">
        <div className="w-[40px] h-[40px]">
          <img src="/Logo.png" />
        </div>
        <Link target="blank" href={"/dashboard"}>
          <div
            className="text-black"
            style={{
              fontWeight: usePathname() === "/dashboard" ? "bold" : "normal",
            }}
          >
            Dashboard
          </div>
        </Link>

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
      <div className="flex gap-[24px]">
        <Button>+ Records</Button>
        <Link href={"/login"}>
          <div
            onClick={LogOut}
            className="w-[40px] h-[40px] rounded-full overflow-hidden"
          >
            <img src="self-port.jpg" />
          </div>
        </Link>
      </div>
    </div>
  );
};
