// utils/crypto.ts
import CryptoJS from "crypto-js";

const SECRET_KEY = import.meta.env.VITE_SECRET_KEY_URL; // Bạn nên lưu vào .env

export const encryptId = (id) => {
  return CryptoJS.AES.encrypt(id, SECRET_KEY).toString();
};

export const decryptId = (encrypted) => {
  try {
    const bytes = CryptoJS.AES.decrypt(encrypted, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (err) {
    return ""; // Hoặc throw error
  }
};
