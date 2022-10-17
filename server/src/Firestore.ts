import {
  initializeApp,
  applicationDefault,
  cert,
  ServiceAccount,
} from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { readFile } from "fs/promises";

export const initDb = async (privateKey = "") => {
  try {
    const secrets = await readFile("secrets.json").then((data) =>
      data.toString("utf8")
    );

    const serviceAccount: ServiceAccount = JSON.parse(secrets);
    serviceAccount.privateKey = privateKey;

    initializeApp({
      credential:
        process.env.NODE_ENV === "development"
          ? cert(serviceAccount)
          : applicationDefault(),
    });

    const db = getFirestore();
    return db;
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
