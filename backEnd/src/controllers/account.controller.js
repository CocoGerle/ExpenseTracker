const fs = require("fs");
const path = require("path");
const { v4 } = require("uuid");

const getAllAccounts = async (req, res) => {
  console.log(req.body);
  try {
    const filePath = path.join(__dirname, "..", "data", "accounts.json");

    const rawData = fs.readFileSync(filePath);

    const accounts = JSON.parse(rawData);

    res.json(accounts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Interval Server Error" });
  }
};

const createAccount = async (req, res) => {
  console.log(req.body);
  try {
    const filePath = path.join(__dirname, "..", "data", "accounts.json");

    const rawData = fs.readFileSync(filePath);

    const accounts = JSON.parse(rawData);

    const newAccount = {
      ...req.body,
      id: v4(),
    };

    accounts.push(newAccount);

    fs.writeFileSync(filePath, JSON.stringify(accounts));

    res.json(newAccount);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Interval Server Error" });
  }
};

const getAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const filePath = path.join(__dirname, "..", "data", "accounts.json");

    const rawData = fs.readFileSync(filePath);
    const accounts = JSON.parse(rawData);

    const account = accounts.find((account) => account.id === id);

    if (!account) {
      return res.status(404).json({ error: "Account not found" });
    }

    res.json(account);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteAccount = async (req, res) => {
  try {
    const { id } = req.params;

    const filePath = path.join(__dirname, "..", "data", "accounts.json");
    const rawData = fs.readFileSync(filePath, "utf-8");
    const accounts = JSON.parse(rawData);

    const accountIndex = accounts.findIndex((account) => account.id === id);

    if (accountIndex === -1) {
      return res.status(404).json({ error: "Account not found" });
    }

    const deletedAccount = accounts.splice(accountIndex, 1)[0];

    fs.writeFileSync(filePath, JSON.stringify(accounts, null, 2));

    res.json({ message: "Account successfully deleted", deletedAccount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteAllAccounts = async (req, res) => {
  console.log(req.body);
  try {
    const filePath = path.join(__dirname, "..", "data", "accounts.json");

    const rawData = fs.readFileSync(filePath);

    const accounts = JSON.parse(rawData);

    const deleteAll = accounts.splice(0, accounts.length);

    fs.writeFileSync(filePath, JSON.stringify(accounts));

    res.json({ message: "Account successfully deleted", deleteAll });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Interval Server Error" });
  }
};

const updateAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const filePath = path.join(__dirname, "..", "data", "accounts.json");
    const rawData = fs.readFileSync(filePath, "utf-8");
    const accounts = JSON.parse(rawData);

    const accountIndex = accounts.findIndex((account) => account.id === id);

    if (accountIndex === -1) {
      return res.status(404).json({ error: "Account not found" });
    }

    accounts[accountIndex] = { ...accounts[accountIndex], ...updatedData };
    console.log(accounts[accountIndex], "aaaaaaaaaaaaaaaa");

    fs.writeFileSync(filePath, JSON.stringify(accounts, null, 2));

    res.json({
      message: "Account successfully updated",
      account: accounts[accountIndex],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllAccounts,
  createAccount,
  getAccount,
  deleteAccount,
  deleteAllAccounts,
  updateAccount,
};
