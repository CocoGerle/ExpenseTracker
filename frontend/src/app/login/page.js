"use client";

import { UserContext } from "@/components/utils/context";
import { useContext } from "react";

export default function Home() {
  const { userInfo } = useContext(UserContext);
  return (
    <div>
      <p>Login</p>
      <p>hii {userInfo.firstName}</p>
      <p>hello {userInfo.lastName}</p>
    </div>
  );
}
