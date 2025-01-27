import {
    Contract,
    Keypair,
    Networks,
    Operation,
    rpc,
    SorobanDataBuilder,
    TransactionBuilder,
    xdr
} from "@stellar/stellar-sdk";
import {Durability} from "@stellar/stellar-sdk/lib/rpc";

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
    if (!process.argv[4]) {
        console.error(`You must provide a persistentStorageKey as a parameter \n`);
        return;
    }

    const contractId: string = process.argv[2];
    const sourceKeypair = Keypair.fromSecret(process.argv[3]);
    const persistentStorageKeyString: string = process.argv[4];
    let persistentStorageAccountId = Keypair.fromPublicKey(persistentStorageKeyString)
        .xdrAccountId();

    const rpcServer = new rpc.Server("https://soroban-testnet.stellar.org");

    // Create a new transaction builder
    const account = await rpcServer.getAccount(sourceKeypair.publicKey());
    const fee = "200100"; // Base fee plus resource fee

    // Persistent DataKey XDR value
    let dataKey = xdr.ScVal.scvVec([xdr.ScVal.scvSymbol("Balance"),
        xdr.ScVal.scvAddress(xdr.ScAddress.scAddressTypeAccount(persistentStorageAccountId))]);

    // Get the contract instance
    const contract = new Contract(contractId);

    // Get Persistent Data Ledger Entry
    const persistentData = contract.getFootprint().contractData().key(dataKey);
    let persistentDataLedgerEntry = await rpcServer
        .getContractData(contract, persistentData, Durability.Persistent);

    // Set the Soroban data and create an operation to extend the contract's TTL
    const sorobanData = new SorobanDataBuilder()
        .setResourceFee(200_000)
        .setReadOnly([persistentDataLedgerEntry.key])
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