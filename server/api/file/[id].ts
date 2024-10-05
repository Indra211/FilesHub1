import { FilesModel } from "~/server/model/files";
import AuthCheck from "../protected.get";
export default defineEventHandler(async (event) => {
  const tokenCheck: any = AuthCheck(event);
  if (!tokenCheck) {
    return { error: "Unauthorized", statuesCode: 401 };
  }
  const { id }: any = event.context.params;
  console.log(id);
  await FilesModel.findByIdAndDelete(id);
  return { success: true };
});
