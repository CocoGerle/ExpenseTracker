// const jwt = require("jsonwebtoken");
import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  if (req.path.startsWith("/auth")) return next();

  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Нэвтрэх шаардлагатай байна!" });
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (err) {
    console.error("JWT verification error:", err);
    return res.status(401).json({ error: "Хүчинтэй бус токен!" });
  }
};
