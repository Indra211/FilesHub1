import bcrypt from "bcryptjs";
import { UserModel } from "../model/user";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { username, email, password } = body;

  if (!username || !email || !password) {
    return { error: "Username, email, and password are required" };
  }
  const existingUser = await UserModel.findOne({
    $or: [{ username }, { email }],
  });
  if (existingUser) {
    return {
      error: "Email/username already in use, please try again or login",
    };
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new UserModel({
    username,
    email,
    password: hashedPassword,
  });
  await user.save();

  return { message: "User registered successfully" };
});
