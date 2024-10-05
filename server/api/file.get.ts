import { FilesModel } from "../model/files";
import AuthCheck from "../api/protected.get";
export default defineEventHandler(async (event) => {
  const tokenCheck: any = AuthCheck(event);
  if (!tokenCheck) {
    return { error: "Unauthorized", statuesCode: 401 };
  }
  const userid: any = tokenCheck["id"];
  const files = await FilesModel.find({ user: userid });
  return files;
});
