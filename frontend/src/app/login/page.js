"use client";

import { GeldIcon } from "@/assets/icons/GeldIcon";

const { useState } = require("react");
const { useAuth } = require("../../components/utils/AuthProvider");

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  return (
    <div className="flex h-[100%] ">
      <div className="flex flex-1 flex-col py-[276px] px-[200px]">
        <GeldIcon />
        <div className="flex flex-col items-center">
          <h1 className="text-[#0F172A] text-[24px] font-semibold">
            Welcome Back
          </h1>
          <p className="text-[#334155]">
            Welcome back, Please enter your details
          </p>
        </div>
        <div>
          <input
            placeholder="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            placeholder="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button onClick={() => login(email, password)}>Submit</button>
      </div>
      <div className="bg-[#0166FF] flex-1 "></div>
    </div>
  );
};
export default Login;
