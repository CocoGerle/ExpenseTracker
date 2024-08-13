const { readJson } = require("../utils");

const login = async (req, res) => {
  const { email, password } = req.body;
  const users = readJson("users.json");

  const user = users.find(
    (user) => user.email === email && user.password === password
  );

  if (user) {
    res.status(200).json({ message: "Login successful" });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
};

module.exports = { login };
