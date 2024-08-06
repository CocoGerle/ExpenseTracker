"use client";
import axios from "axios";
import { useContext, useEffect, useState } from "react";

import Link from "next/link";
import { UserContext } from "./utils/context";
import { UpDateDialog } from "./UpdateDialog";

export const Test = () => {
  const [accounts, setAccounts] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  // const { userInfo, setUserInfo } = useContext(UserContext);
  // console.log(userInfo);

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get("http://localhost:3001/accounts");
      setAccounts(response.data);
    };
    getData();
  }, []);

  const createAccount = async () => {
    const newAccount = {
      title,
      amount,
    };
    const response = await axios.post(
      `http://localhost:3001/accounts`,
      newAccount
    );

    setAccounts([...accounts, response.data]);
  };

  const deleteAccount = async (id) => {
    const response = await axios.delete(`http://localhost:3001/accounts/${id}`);
    setAccounts(accounts.filter((item) => item.id !== id));
  };

  const deleteAllAccount = async () => {
    const response = await axios.delete("http://localhost:3001/accounts");
    setAccounts([]);
    console.log(response.data);
  };

  return (
    <div className="text-black bg-slate-400">
      <h1>Accounts</h1>
      <ul>
        {accounts.map((account, index) => (
          <li key={account.title + index}>
            {account.title}-{account.amount}
            <button
              className="w-10 h-10 ml-10"
              onClick={() => {
                deleteAccount(account.id);
              }}
            >
              delete
            </button>
            <UpDateDialog
              id={account.id}
              amount={account.amount}
              title={account.title}
              setAccounts={setAccounts}
            />
          </li>
        ))}
      </ul>
      <div className="flex gap-4 p-6">
        <input
          placeholder="title"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
        <input
          placeholder="amount"
          value={amount}
          onChange={(event) => {
            setAmount(event.target.value);
          }}
        />
        <button onClick={createAccount}>Create</button>
        <button onClick={deleteAllAccount}>Delete All </button>
      </div>

      <div>
        <div>
          <label>First Name</label>
          <input
            onChange={(event) =>
              setUserInfo({ ...userInfo, firstName: event.target.value })
            }
            className="border"
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            onChange={(event) =>
              setUserInfo({ ...userInfo, lastName: event.target.value })
            }
            className="border"
          />
        </div>
        <Link href="/login">Login</Link>
      </div>
    </div>
  );
};
