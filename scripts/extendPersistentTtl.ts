import {Contract, rpc, SorobanDataBuilder, xdr} from "@stellar/stellar-sdk";
import {getAssembledSignedTransaction, getRpcServer, pollForTransactionCompletion} from "./util/rpcServerFactory";
import {getDeployedContractId, getPersistentStorageKey} from "./util/argumentProcessor";

module.exports = (async function () {

    let persistentStorageAccountId = getPersistentStorageKey();
    const rpcServer = await getRpcServer();


    // Persistent DataKey XDR value
    let dataKey = xdr.ScVal.scvVec([xdr.ScVal.scvSymbol("Balance"),
        xdr.ScVal.scvAddress(xdr.ScAddress.scAddressTypeAccount(persistentStorageAccountId))]);

    // Get the contract instance
    const contract = new Contract(getDeployedContractId());

    // Get Persistent Data Ledger Entry
    const persistentData = contract.getFootprint().contractData().key(dataKey);
    const persistentDataLedgerEntry = await rpcServer
        .getContractData(contract, persistentData, rpc.Durability.Persistent);

    // Set the Soroban data and create an operation to extend the contract's TTL
    const sorobanData = new SorobanDataBuilder()
        .setResourceFee(200_000)
        .setReadOnly([persistentDataLedgerEntry.key])
        .build();

    let assembledTransaction =
        await getAssembledSignedTransaction(sorobanData, rpcServer, 2999499);

    const result =
        await rpcServer.sendTransaction(assembledTransaction);
    console.log("Transaction Hash: " + result.hash);

    let getTransactionResponse =
        await pollForTransactionCompletion(rpcServer, result);

    console.log(getTransactionResponse);

})().catch(reason => console.log(reason));