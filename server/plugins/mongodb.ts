import mongoose from "mongoose";

export default defineNitroPlugin(() => {
  mongoose
    .connect(
      "mongodb+srv://indra211:indra211@cluster0.izcda.mongodb.net/fileshub?retryWrites=true&w=majority&appName=Cluster0"
    )
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));
});
