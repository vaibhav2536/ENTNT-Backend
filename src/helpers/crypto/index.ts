import crypto from "crypto";

class CryptoHelper {
  hashPassword = (password: string) => {
    const salt = crypto.randomBytes(16).toString("hex");
    const hash = crypto
      .pbkdf2Sync(password, salt, 1000, 64, "sha512")
      .toString("hex");
    return `${salt}:${hash}`;
  };

  verifyPassword = (password: string, storedHash: string) => {
    const [salt, hash] = storedHash.split(":");
    const hashToVerify = crypto
      .pbkdf2Sync(password, salt, 1000, 64, "sha512")
      .toString("hex");
    return hash === hashToVerify;
  };
}

export default new CryptoHelper();
