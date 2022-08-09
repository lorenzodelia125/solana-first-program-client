import { initializeKeypair } from "./initializeKeypair";
import {
  Connection,
  PublicKey,
  Transaction,
  TransactionInstruction,
  LAMPORTS_PER_SOL,
  sendAndConfirmTransaction,
  clusterApiUrl,
} from "@solana/web3.js";

async function main() {
  const connection = new Connection(clusterApiUrl("devnet"));

  const keypair = await initializeKeypair();

  const programId = new PublicKey(
    "8QVaTeTXHaTbbHG1x4xHpq4J4vRqNduCCDF3hVJkdEiH"
  );

  try {
    const airdrop = await connection.requestAirdrop(
      keypair.publicKey,
      2 * LAMPORTS_PER_SOL
    );

    console.log(airdrop);

    const latestBlockHash = await connection.getLatestBlockhash();

    await connection.confirmTransaction({
      blockhash: latestBlockHash.blockhash,
      lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
      signature: airdrop,
    }); // attende la conferma della transazione prima di proseguire
  } catch (err) {
    console.log(err);
  }

  const transaction = new Transaction();

  const instruction = new TransactionInstruction({
    keys: [],
    programId,
  });

  transaction.add(instruction);

  try {
    let txid = await sendAndConfirmTransaction(connection, transaction, [
      keypair,
    ]);
    console.log(`https://explorer.solana.com/tx/${txid}?cluster=devnet`);
  } catch (err) {
    console.log(err);
  }
}

main()
  .then(() => {
    console.log("Finished successfully");
  })
  .catch((error) => {
    console.error(error);
  });
