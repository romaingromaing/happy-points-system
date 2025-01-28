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
import {getRpcServer, pollForTransactionCompletion} from "./util/rpcServerFactory";
import {getDeployedContractId, getPersistentStorageKeyString, getSourceKeypair} from "./util/argumentProcessor";


module.exports = (async function () {
    const NETWORK_PASSPHRASE = Networks.TESTNET; // Use appropriate network

    const contractId: string = getDeployedContractId();
    const sourceKeypair = getSourceKeypair();
    const persistentStorageKeyString: string = getPersistentStorageKeyString();
    let persistentStorageAccountId = Keypair.fromPublicKey(persistentStorageKeyString)
        .xdrAccountId();
    const rpcServer = getRpcServer();

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
        .getContractData(contract, persistentData, rpc.Durability.Persistent);

    let ttlBefore = persistentDataLedgerEntry.key.toXDR("base64");
    console.log("TTL Before: " + ttlBefore);

    // Set the Soroban data and create an operation to extend the contract's TTL
    const sorobanData = new SorobanDataBuilder()
        .setResourceFee(200_000)
        .setReadOnly([persistentDataLedgerEntry.key])
        .build();
    const transaction = new TransactionBuilder(account, {
        fee,
        networkPassphrase: NETWORK_PASSPHRASE,
    })
        .setSorobanData(sorobanData)
        .addOperation(
            Operation.extendFootprintTtl({
                extendTo: 2913482,
            }),
        )
        .setTimeout(30)
        .build();

    const ttlSimResponse: rpc.Api.SimulateTransactionResponse =
        await rpcServer.simulateTransaction(transaction);

    let assembledTransaction =
        rpc.assembleTransaction(transaction, ttlSimResponse)
            .build();

    // Sign and submit the transaction
    assembledTransaction.sign(sourceKeypair);
    const result = await rpcServer.sendTransaction(assembledTransaction);

    console.log(
        "Transaction submitted:",
        JSON.stringify(result, null, 2),
    );

    let getTransactionResponsePromise = pollForTransactionCompletion(rpcServer, result);

    let success = await getTransactionResponsePromise;

    let contractDataAfter = await rpcServer
        .getContractData(contract, persistentData, rpc.Durability.Persistent);

    let ttlAfter = contractDataAfter.liveUntilLedgerSeq;
    console.log("TTL After: " + ttlAfter);

    console.log(success);
})();