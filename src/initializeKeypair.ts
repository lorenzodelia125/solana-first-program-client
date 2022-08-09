import { Keypair } from "@solana/web3.js";
import dotenv from "dotenv";
import * as fs from "fs";

dotenv.config();

export const initializeKeypair = async () => {
  if (!process.env.PRIVATE_KEY) {
    const keypair = Keypair.generate();
    fs.writeFileSync(".env", `PRIVATE_KEY=[${keypair.secretKey.toString()}]`);

    return keypair;
  }

  const secret = JSON.parse(process.env.PRIVATE_KEY ?? "") as number[]; // transforma la chiave privata in un array di numeri
  const secretKey = Uint8Array.from(secret); // trasforma l'array di numeri in un array di uint8
  const keypair = Keypair.fromSecretKey(secretKey);

  return keypair;
};
