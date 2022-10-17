import { scrypt, randomBytes } from "crypto";
import type { ScryptOptions } from "crypto";
import type { StoredCredentials } from "./types/types";

/**
 * TODO:
 * create generic "deriveKey" function and call it from verify and create
 */

/**
 *
 * @param plaintext unencrypted plaintext provided by the user
 * @param storedCredentials credentials to try verification against
 * @param enc encoding of the plaintext password, default: `"utf8"`
 * @returns {Promise<boolean>} Promise: `true` if success or `false` if not. rejects on error
 */
export const verifyCredentials = async (
  plaintext: string,
  storedCredentials: StoredCredentials,
  enc: BufferEncoding = "utf8"
): Promise<boolean> =>
  new Promise((resolve, reject) => {
    scrypt(
      Buffer.from(plaintext, enc),
      storedCredentials.salt,
      storedCredentials.key.length,
      storedCredentials.scryptOpts,
      (err, derivedKey) => {
        if (err) return reject(err);

        if (derivedKey)
          if (derivedKey.compare(storedCredentials.key) === 0)
            // Is this vulnerable to timing attacks?
            return resolve(true);
          else return resolve(false);
        return reject("Unknown error");
      }
    );
  });

/**
 *
 * @param plaintext unencrypted plaintext password to hash
 * @param enc encoding of the plaintext password, default: `"utf8"`
 * @param saltLen salt length >= 32, default: `64`
 * @param keyLen key length >= 64, default: `64`
 * @param scryptOpts options to pass to scrypt, default: `N: 16384, r: 8, p: 4` (N=cost, r=blocksize, p=parallelism)
 * @returns {Promise<string>} encoded hash in the format `SCRYPT:N:r:p:base64salt:base64key`
 */
export const createUserKey = (
  plaintext: string,
  enc: BufferEncoding = "utf8",
  saltLen = 64,
  keyLen = 64,
  scryptOpts: ScryptOptions = { N: 16384, r: 8, p: 4 }
): Promise<string> => {
  const salt = randomBytes(saltLen);
  return new Promise((resolve, reject) =>
    scrypt(
      Buffer.from(plaintext, enc),
      salt,
      keyLen,
      scryptOpts,
      (err, derivedKey) => {
        if (err) return reject(err);
        if (derivedKey) {
          const encodedHash = [
            "SCRYPT",
            scryptOpts.N,
            scryptOpts.r,
            scryptOpts.p,
            salt.toString("base64"),
            derivedKey.toString("base64"),
          ];
          return resolve(encodedHash.join(":"));
        }
        return reject("Unknown error");
      }
    )
  );
};
