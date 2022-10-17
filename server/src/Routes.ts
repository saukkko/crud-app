import { Response, Router } from "express";
import { Timestamp } from "firebase-admin/firestore";
import { createUser, findUserByUsername } from "./Users.js";
import { Temporal } from "@js-temporal/polyfill";
import { verifyCredentials } from "./Crypt.js";
import type { UserDocument, User } from "./types/types.js";

export const api = Router();

const sendUnauthorized = (res: Response) =>
  res.status(401).json({ msg: "AUTH FAIL", token: "no token for you!" });
const sendSuccess = (res: Response) =>
  res.status(200).json({ msg: "AUTH OK", token: "here, take this token" });

const timestampToInstant = (ts: Timestamp) =>
  Temporal.Instant.fromEpochMilliseconds(ts.toMillis());

const millisToDateTimeISO = (millis: number) => {
  const tz = Temporal.Now.timeZone();
  const instant = Temporal.Instant.fromEpochMilliseconds(millis);
  const zonedDateTime = instant.toZonedDateTimeISO(tz);

  return zonedDateTime.toString({
    fractionalSecondDigits: 3,
    smallestUnit: "millisecond",
    timeZoneName: "never",
  });
};

api.get("/user/:username", async (req, res) => {
  try {
    const { username, hash, creationDate, updated } = (await findUserByUsername(
      req.params.username
    )) as User;

    res.json({
      username: username,
      hash: hash,
      updated: millisToDateTimeISO(updated.toMillis()),
      creationDate: millisToDateTimeISO(creationDate.toMillis()),
    });
  } catch (err) {
    err instanceof Error
      ? res.status(400).json({ err: err.name, msg: err.message })
      : res.sendStatus(400);
  }
});

api.post("/user/create", async (req, res) => {
  const { username, plaintext } = JSON.parse(req.body);
  console.log(JSON.parse(req.body));
  console.log(username, plaintext);

  createUser(username, plaintext)
    .then(() => res.sendStatus(201))
    .catch(() => res.status(400));
});

api.post("/user/login", async (req, res) => {
  const { username, password } = JSON.parse(req.body);
  console.log(JSON.parse(req.body));
  console.log(username, password);

  await findUserByUsername(username).then(async (doc) => {
    if (doc) {
      const user: UserDocument = doc;
      if (user && user.hash) {
        const [algo, N, r, p, saltString, keyString] = user.hash.split(":");
        if (algo !== "SCRYPT") res.sendStatus(401);

        const isAuthorized = await verifyCredentials(password, {
          key: Buffer.from(keyString, "base64"),
          salt: Buffer.from(saltString, "base64"),
          scryptOpts: {
            N: Number(N),
            r: Number(r),
            p: Number(p),
          },
        });

        return isAuthorized ? sendSuccess(res) : sendUnauthorized(res);
      }
    }
    return sendUnauthorized(res);
  });
});

api.all("*", (req, res) =>
  res.append("x-api-header", "something").send("hello api")
);
