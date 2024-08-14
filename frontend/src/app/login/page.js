"use client";

import { GeldIcon } from "@/assets/icons/GeldIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const { useState } = require("react");
const { useAuth } = require("../../components/utils/AuthProvider");

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  return (
    <div className="flex h-screen w-screen ">
      <div className="flex flex-1 flex-col items-center mt-[276px] ml-[222px] gap-[40px]">
        <GeldIcon />
        <div className="flex flex-col items-center">
          <h1 className="text-[#0F172A] text-[24px] font-semibold ">
            Welcome Back
          </h1>
          <p className="text-[#334155]">
            Welcome back, Please enter your details
          </p>
        </div>
        <div className="flex flex-col gap-[16px]">
          <Input
            placeholder="Email"
            className="bg-[#F3F4F6] h-[48px] w-[384px]"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <Input
            placeholder="Password"
            className="bg-[#F3F4F6] h-[48px]"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>

        <button
          className="bg-[#0166FF] rounded-3xl w-[384px] h-[48px] text-white"
          onClick={() => login(email, password)}
        >
          {" "}
          Log in
        </button>
        <div className="flex gap-4">
          <p>Don't have account?</p>
          <p className="text-[#0166FF]">Sign Up</p>
        </div>
      </div>
      <div className="bg-[#0166FF] flex-1 "></div>
    </div>
  );
};
export default Login;
