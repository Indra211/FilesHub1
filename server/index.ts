import express, { Request, Response } from "express";

const app = express();

// Middleware for parsing JSON bodies
app.use(express.json());

app.get("/api", (req: Request, res: Response) => {
  res.send("Hello from server");
});

// Listen on port 3000
export default app;
