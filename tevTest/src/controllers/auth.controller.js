// const { readJson, saveJson } = require("../utils/index.js");
// const { v4 } = require("uuid");
// const jwt = require("jsonwebtoken");
// import { db } from "../database/index.js";
// import { users as userSchema } from "../database/schema.js";

// const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const allUsers = await db.query.users.findMany();

//     const user = allUsers.find(
//       (user) => user.email === email && user.password === password
//     );

//     if (!user)
//       return res.status(401).json({ message: "Ene email burtgelgui bna" });

//     const token = jwt.sign(
//       { name: user.name, email: user.email, id: user.id },
//       process.env.JWT_SECRET
//     );

//     res.json({
//       token,
//       user: { name: user.name, email: user.email, id: user.id },
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// const register = async (req, res) => {
//   const { name, email, password } = req.body;
//   const users = readJson(db.query.users);

//   const user = users.find((user) => user.email === email);

//   if (user)
//     return res.status(400).json({ message: "Ene email bvrtgeltei bna" });

//   const newUser = {
//     id: v4(),
//     name,
//     email,
//     password,
//   };

//   users.push(newUser);

//   saveJson(db.query.users, users);

//   res.json(newUser);
// };

// module.exports = { login, register };

// const { readJson, saveJson } = require("../utils/index.js");
// const { v4 } = require("uuid");
import { v4 } from "uuid";
// const jwt = require("jsonwebtoken");
import jwt from "jsonwebtoken";
import { db } from "../database/index.js";
import { users as userSchema } from "../database/schema.js";
// const bcrypt = require("bcrypt");
import bcrypt from "bcrypt";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const allUsers = await db.query.users.findMany();

    const user = allUsers.find((user) => user.email === email);

    if (!user)
      return res.status(401).json({ message: "This email is not registered" });

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword)
      return res.status(401).json({ message: "Incorrect password" });

    const token = jwt.sign(
      { name: user.name, email: user.email, id: user.id },
      process.env.JWT_SECRET
    );

    res.json({
      token,
      user: { name: user.name, email: user.email, id: user.id },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// export const register = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     const allUsers = await db.query.users.findMany();

//     const existingUser = allUsers.find((user) => user.email === email);

//     if (existingUser)
//       return res
//         .status(400)
//         .json({ message: "This email is already registered" });

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = {
//       id: v4(),
//       name,
//       email,
//       password: hashedPassword,
//     };

//     await db.query.users.insert(newUser);

//     res.json({
//       message: "User registered successfully",
//       user: { name, email, id: newUser.id },
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const { rows: existingUsers } = await db.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (existingUsers.length > 0) {
      return res
        .status(400)
        .json({ message: "This email is already registered" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    const { rows } = await db.query(
      "INSERT INTO users (id, name, email, password) VALUES ($1, $2, $3, $4) RETURNING *",
      [v4(), name, email, hashedPassword]
    );

    const newUser = rows[0];

    res.json({
      message: "User registered successfully",
      user: { name: newUser.name, email: newUser.email, id: newUser.id },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// module.exports = { login, register };
