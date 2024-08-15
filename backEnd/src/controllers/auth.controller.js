const { readJson, saveJson } = require("../utils");
const { v4 } = require("uuid");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { email, password } = req.body;
  const users = readJson("users.json");

  console.log(email, password, users);

  const user = users.find(
    (user) => user.email === email && user.password === password
  );

  if (!user)
    return res.status(400).json({ message: "Ene email burtgelgui bna" });

  const token = jwt.sign(
    {
      email: user.email,
      id: user.id,
    },
    process.env.JWT_SECRET
  );

  res.json({
    token,
    user: {
      email: user.email,
      id: user.id,
    },
  });
};

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const users = readJson("users.json");

  const user = users.find((user) => user.email === email);

  if (user)
    return res.status(400).json({ message: "Ene email bvrtgeltei bna" });

  const newUser = {
    id: v4(),
    name,
    email,
    password,
  };

  users.push(newUser);

  saveJson("users.json", users);

  res.json(newUser);
};

module.exports = { login, register };
