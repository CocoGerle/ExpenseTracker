import { and, eq } from "drizzle-orm";
import { db } from "../database/index.js";
import { users } from "../database/schema.js";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await db.query.users.findFirst({
      where: and(eq(users.email, email), eq(users.password, password)),
    });

    if (!user)
      return res.status(401).json({ message: "password emailee shalgana u" });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET
    );

    res.json({
      message: "Login successful",
      token: token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (user) return res.status(401).json({ message: "burtgeltei email bn" });

    const [newUser] = await db
      .insert(users)
      .values({
        name,
        email,
        password,
      })
      .returning();

    res.json({
      message: "User registered successfully",
      user: { name: newUser.name, email: newUser.email, id: newUser.id },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
