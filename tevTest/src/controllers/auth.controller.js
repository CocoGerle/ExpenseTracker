import db from "../database.js";
import { users } from "../database/schema.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await db.select().from(users).where({ email }).first();

    if (existingUser) {
      return res.status(400).json({ message: "Ene email bvrtgeltei bna" });
    }

    const [newUser] = await db
      .insert(users)
      .values({ name, email, password })
      .returning(["id", "name", "email"]);

    res.json({
      message: "User registered successfully",
      user: { name: newUser.name, email: newUser.email, id: newUser.id },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
