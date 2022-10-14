import express from "express";
import helmet from "helmet";
import { api } from "./Routes.js";

const PORT = isNaN(Number(process.env.NODE_PORT))
  ? 53000
  : Number(process.env.NODE_PORT);

const app = express();
app.use(helmet());
app.use("/api", api);
app.all("*", (req, res) => res.send("hello"));

app.listen(PORT, "localhost", () => console.log(`Listening on port ${PORT}`));
