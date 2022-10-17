import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import { initDb } from "./Firestore.js";
import { validateHeaders } from "./middleware/ValidateHeaders.js";
import { validateJSON } from "./middleware/validateJSON.js";
import { api } from "./Routes.js";
dotenv.config();

export const db = await initDb(process.env.PRIVATE_KEY);
const PORT = isNaN(Number(process.env.NODE_PORT))
  ? 53000
  : Number(process.env.NODE_PORT);

const app = express();
app.use(
  helmet({
    // nginx reverse proxy provides all of these so disable them from helmet
    xssFilter: false,
    frameguard: false,
    noSniff: false,
    hsts: false,
  })
);

app.use(validateHeaders);
app.use(
  express.text({
    type: "application/json",
  })
);
app.use(validateJSON);

app.use("/api", api);
app.all("*", (req, res) => res.send("hello"));

app.listen(PORT, "localhost", () => console.log(`Listening on port ${PORT}`));
