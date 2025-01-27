import {
    Contract,
    Keypair,
    Networks,
    Operation,
    rpc,
    SorobanDataBuilder,
    TransactionBuilder
} from "@stellar/stellar-sdk";

module.exports = (async function () {

    // Ensure parameters are passed in
    if (!process.argv[2]) {
        console.error(`You must provide a contractId as a parameter \n`);
        return;
    }
    if (!process.argv[3]) {
        console.error(`You must provide a sourceKeypair as a parameter \n`);
        return;
    }

    const contractId: string = process.argv[2];
    const sourceKeypair = Keypair.fromSecret(process.argv[3]);

    const rpcServer = new rpc.Server("https://soroban-testnet.stellar.org");

    // Create a new transaction builder
    const account = await rpcServer.getAccount(sourceKeypair.publicKey());
    const fee = "200100"; // Base fee plus resource fee

    // Get the contract instance
    const contract = new Contract(contractId);
    const instance = contract.getFootprint();

    // Set the Soroban data and create an operation to extend the contract's TTL
    const sorobanData = new SorobanDataBuilder()
        .setResourceFee(200_000)
        .setReadOnly([instance])
        .build();

    const transaction = new TransactionBuilder(account, {
        fee,
        networkPassphrase: Networks.TESTNET, // Use appropriate network
    })
        .setSorobanData(sorobanData)
        .addOperation(
            Operation.extendFootprintTtl({
                extendTo: 10_000,
            }),
        )
        .setTimeout(30)
        .build();

    // Sign and submit the transaction
    transaction.sign(sourceKeypair);
    const result = await rpcServer.sendTransaction(transaction);

    console.log(
        "Transaction submitted. Result:",
        JSON.stringify(result, null, 2),
    );
    return result;
})();