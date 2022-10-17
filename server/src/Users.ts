import { randomUUID } from "crypto";
import { Timestamp } from "firebase-admin/firestore";
import { createUserKey } from "./Crypt.js";
import { db } from "./index.js";

/*
 * TODO:
 * Handle errors in all functions
 */

export const findUserByUsername = async (username: string) =>
  db
    .collection("users")
    .where("username", "==", username)
    .get()
    .then((data) => {
      const doc = data.docs.find((x) => x.data().username === username);
      const user = doc?.data();

      return user;
    });

export const findUserById = async (userId: string) =>
  db
    .collection("users")
    .doc(userId)
    .get()
    .then((doc) => doc.data());

export const createUser = async (username: string, plaintext: string) => {
  const now = Timestamp.now();
  const user = {
    username: username,
    hash: await createUserKey(plaintext),
    creationDate: now,
    updated: now,
    disabled: true,
    accessLevel: null,
  };
  console.log(user);
  db.collection("users")
    .doc(randomUUID())
    .create(user)
    .then(console.log)
    .catch(console.error);
};
