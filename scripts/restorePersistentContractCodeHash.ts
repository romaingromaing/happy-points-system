import {Operation, SorobanDataBuilder, xdr} from "@stellar/stellar-sdk";
import {getAssembledSignedTransaction, getRpcServer, pollForTransactionCompletion} from "./util/rpcServerFactory";


module.exports = (async function () {
    const rpcServer = await getRpcServer();

    let arrayBufferBuffer =
        Buffer.from("4b9316721487281d8201e1c6044544400f120253487971e339eb23a465516935", 'hex');

    let ledgerKeyXdr = xdr.LedgerKey
        .contractCode(new xdr.LedgerKeyContractCode({hash: arrayBufferBuffer}));

    // Set the Soroban data and create an operation to extend the contract's TTL
    const sorobanData = new SorobanDataBuilder()
        .setResourceFee(200_000)
        .setReadWrite([ledgerKeyXdr])
        .build();

    let assembledTransaction =
        await getAssembledSignedTransaction(sorobanData, rpcServer,
            Operation.restoreFootprint({}));

    const result =
        await rpcServer.sendTransaction(assembledTransaction);
    console.log("Transaction Hash: " + result.hash);

    return await pollForTransactionCompletion(rpcServer, result);
})()
    .then(value => console.log(value))
    .catch(reason => console.log(reason))
    .finally(() => console.log("restorePersistentData.ts script complete \n"));