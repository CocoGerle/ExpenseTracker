const fs = require("fs");
const path = require("path");
const { v4 } = require("uuid");

const getAllCategory = async (req, res) => {
  console.log(req.body);
  try {
    const filePath = path.join(__dirname, "..", "data", "category.json");

    const rawData = fs.readFileSync(filePath);

    const accounts = JSON.parse(rawData);

    res.json(accounts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Interval Server Error" });
  }
};

const createCategory = async (req, res) => {
  console.log(req.body);
  try {
    const filePath = path.join(__dirname, "..", "data", "category.json");

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

const getCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const filePath = path.join(__dirname, "..", "data", "category.json");

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

module.exports = { createCategory, getAllCategory, getCategory };
