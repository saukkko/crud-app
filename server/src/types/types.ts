import type { ScryptOptions } from "crypto";
import type { DocumentData, Timestamp } from "firebase-admin/firestore";
export type StoredCredentials = {
  key: Buffer;
  salt: Buffer;
  scryptOpts: ScryptOptions;
};

export type UserDocument = DocumentData & {
  username?: string;
  hash?: string;
};

export type User = DocumentData & {
  username: string;
  hash: string;
  creationDate: Timestamp;
  updated: Timestamp;
  disabled: boolean;
  accessLevel: number | null;
};
