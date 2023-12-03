import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { HelloAnchorProgram } from "../target/types/hello_anchor_program";
import {} from "assert";
import { assert } from "chai";

describe("hello-anchor-program", async () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace
    .HelloAnchorProgram as Program<HelloAnchorProgram>;

  let _myAccount = null;

  it("Is initialized!", async () => {
    // initializing the demo wallet
    let myAccount = anchor.web3.Keypair.generate();

    // Add your test here.
    const tx = await program.methods
      .initialize()
      .accounts({
        myAccount: myAccount.publicKey.toString(),
        user: anchor.getProvider().publicKey.toString(),
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([myAccount])
      .rpc();

    const account = await program.account.myAccount.fetch(
      myAccount.publicKey.toString()
    );

    console.log("count:", account.count.toNumber());

    assert.equal(account.count.toNumber(), 0);

    // storing the account for the next test
    _myAccount = myAccount;
  });

  it("increment count!", async () => {
    const myAccount = _myAccount;
    if (!myAccount || !myAccount.publicKey) {
      return console.error("my account or public key not defined");
    }
    const tx = await program.methods
      .increment()
      .accounts({
        myAccount: myAccount.publicKey,
      })
      .rpc();
    const account = await program.account.myAccount.fetch(
      myAccount.publicKey.toString()
    );
    console.log(
      "success count has been incremented count:",
      account.count.toNumber()
    );
    console.log(tx);

    assert.equal(account.count.toNumber(), 1);
  });

  it("decrement count!", async () => {
    const myAccount = _myAccount;
    if (!myAccount || !myAccount.publicKey) {
      return console.error("my account or public key not defined");
    }
    const tx = await program.methods
      .decrement()
      .accounts({ myAccount: myAccount.publicKey.toString() })
      .rpc();
    const account = await program.account.myAccount.fetch(
      myAccount.publicKey.toString()
    );
    console.log(
      "success count has been decremented count:",
      account.count.toNumber()
    );
    console.log(tx);

    assert.equal(account.count.toNumber(), 0);
  });

  it("updated count!", async () => {
    const myAccount = _myAccount;

    if (!myAccount || !myAccount.publicKey) {
      return console.error("my account or public key not defined");
    }
    const tx = await program.methods
      .update(new anchor.BN(5))
      .accounts({ myAccount: myAccount.publicKey.toString() })
      .rpc();
    const account = await program.account.myAccount.fetch(
      myAccount.publicKey.toString()
    );
    console.log(
      "success count has been incremented count:",
      account.count.toNumber()
    );
    console.log(tx);

    assert.equal(account.count.toNumber(), 5);
  });
});
