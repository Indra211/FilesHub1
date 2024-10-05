import { FilesModel } from "../model/files";
import AuthCheck from "../api/protected.get";
export default defineEventHandler(async (event) => {
  const tokenCheck: any = AuthCheck(event);
  if (!tokenCheck) {
    return { error: "Unauthorized", statuesCode: 401 };
  }
  const userid: any = tokenCheck["id"];
  const body = await readBody(event);
  const { name, file, size } = body;
  if (!name || !file || !size) {
    return { error: "Name, file, size, and user are required" };
  }
  const newFile = new FilesModel({
    name,
    file,
    size,
    user: userid,
  });
  await newFile.save();
  return {
    message: "File uploaded successfully",
    success: true,
    statuesCode: 201,
  };
});
