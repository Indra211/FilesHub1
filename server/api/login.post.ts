import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { UserModel } from "../model/user";

const JWT_SECRET = useRuntimeConfig().jwtsecret;

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { username, password } = body;

  if (!username || !password) {
    return { error: "Username and password are required" };
  }

  const user = await UserModel.findOne({ username });
  if (!user) {
    return { error: "Invalid username or password" };
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return { error: "Invalid username or password" };
  }
  const token = jwt.sign(
    { username: user.username, id: user._id },
    JWT_SECRET,
    { expiresIn: "30d" }
  );

  return { message: "Login successful", token };
});
