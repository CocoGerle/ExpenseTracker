import axios from "axios";

export const api = axios.create({
  baseURL: "https://expensetracker-k31i.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});
