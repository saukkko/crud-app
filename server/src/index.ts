import express from "express";
import { api } from "./Routes.js";

const PORT = isNaN(Number(process.env.NODE_PORT))
  ? 53000
  : Number(process.env.NODE_PORT);

const app = express();

app.use("/api", api);
app.all("*", (req, res) => res.send("hello"));

app.listen(PORT, "localhost", () => console.log(`Listening on port ${PORT}`));
