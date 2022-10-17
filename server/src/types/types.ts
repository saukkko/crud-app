import type { ScryptOptions } from "crypto";
import type { DocumentData } from "firebase-admin/firestore";
export type StoredCredentials = {
  key: Buffer;
  salt: Buffer;
  scryptOpts: ScryptOptions;
};

export type UserDocument = DocumentData & {
  username?: string;
  hash?: string;
};
