import jwt from "jsonwebtoken";

const JWT_SECRET = useRuntimeConfig().jwtsecret;

export default defineEventHandler((event) => {
  const token = event.req.headers?.["authorization"];

  if (!token) {
    return false;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (err) {
    return false;
  }
});
