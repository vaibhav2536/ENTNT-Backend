import crypto from "crypto";

import logger from "../../utils/logger";
import ENV_CONFIG from "../../configs/env.config";

export interface CryptoHelperType {
  encrypt: (text: string) => { data: string | null; error: string | null };
  decrypt: (text: string) => { data: string | null; error: string | null };
}

class CryptoEncoder {
  private algorithm: string;
  private key: Buffer;
  private iv: Buffer;

  constructor() {
    this.algorithm = "aes-256-ctr";
    this.key = Buffer.from(ENV_CONFIG.ENCRYPTION_SECRET, "utf8");
    this.iv = Buffer.from(ENV_CONFIG.IV_HEX_STRING, "hex");
  }

  encrypt(text: any) {
    try {
      if (!text) return { data: null, error: "Text is empty." };

      const textString = text.toString();
      logger.info(
        `Text to encrypt: ${textString}, using algorithm ${this.algorithm} and key ${this.key}`,
      );
      const cipher = crypto.createCipheriv(this.algorithm, this.key, this.iv);
      const encryptedText =
        cipher.update(textString, "utf8", "hex") + cipher.final("hex");

      return { data: encryptedText, error: null };
    } catch (err: any) {
      logger.error(`Error while encrypting text: `, err);
      return { data: null, error: err.message };
    }
  }

  decrypt(text: any) {
    try {
      if (!text) return { data: null, error: "Text is empty." };

      const textString = text.toString();
      const decipher = crypto.createDecipheriv(
        this.algorithm,
        this.key,
        this.iv,
      );
      const decryptedText =
        decipher.update(textString, "hex", "utf8") + decipher.final("utf8");

      return { data: decryptedText, error: null };
    } catch (err: any) {
      logger.error(`Error while decrypting text: `, err);
      return { data: null, error: err.message };
    }
  }
}

export default CryptoEncoder;
