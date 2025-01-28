import {Contract, Networks, Operation, rpc, SorobanDataBuilder, TransactionBuilder} from "@stellar/stellar-sdk";
import {getRpcServer} from "./util/rpcServerFactory";
import {getDeployedContractId, getSourceKeypair} from "./util/argumentProcessor";


module.exports = (async function () {
    const NETWORK_PASSPHRASE = Networks.TESTNET; // Use appropriate network

    const contractId: string = getDeployedContractId();
    const sourceKeypair = getSourceKeypair();
    const rpcServer = getRpcServer();

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
        "Transaction submitted. Result:",
        JSON.stringify(result, null, 2),
    );

    await rpcServer.pollTransaction(result.hash, {
        attempts: 10,
        sleepStrategy: rpc.BasicSleepStrategy
    });

    let transactionResult = await rpcServer.getTransaction(result.hash);

    console.log(
        "Transaction Result: ",
        JSON.stringify(transactionResult, null, 2),
    );

})();