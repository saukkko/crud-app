import express from "express";
import { api } from "./Routes.js";

const PORT = isNaN(Number(process.env.PORT)) ? 3001 : process.env.PORT;

const app = express();
process.env.NODE_ENV === "production"
  ? app.use("/", express.static("../client/"))
  : app.all("/", (req, res) => res.send("OK"));

app.use("/api", api);
app.all("*", (req, res) => res.send("hello"));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
