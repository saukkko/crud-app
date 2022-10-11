import { Router } from "express";

export const api = Router();

api.all("*", (req, res) =>
  res.append("x-api-header", "something").send("hello api")
);
