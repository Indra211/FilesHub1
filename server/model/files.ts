import { Schema, model, ObjectId } from "mongoose";

interface IFile {
  name: string;
  file: string;
  size: number;
  user: ObjectId;
}

const filesSchema = new Schema<IFile>(
  {
    name: {
      type: String,
      required: [true, "Please provide name"],
    },
    file: {
      type: String,
      required: [true, "Please provide file"],
    },
    size: {
      type: Number,
      required: [true, "Please provide file size"],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "Login",
      required: [true, "Please provide a login reference"],
    },
  },
  { timestamps: true }
);

export const FilesModel = model<IFile>("Files", filesSchema);
