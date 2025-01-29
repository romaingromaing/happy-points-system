import {Contract, Operation, SorobanDataBuilder, xdr} from "@stellar/stellar-sdk";
import {getDeployedContractId, getPersistentStorageKey} from "./util/argumentProcessor";
import {getAssembledSignedTransaction, getRpcServer, pollForTransactionCompletion} from "./util/rpcServerFactory";


module.exports = (async function () {
    let persistentStorageAccountId = getPersistentStorageKey();
    const rpcServer = await getRpcServer();

    // Persistent DataKey XDR value
    let dataKey = xdr.ScVal.scvVec([xdr.ScVal.scvSymbol("Balance"),
        xdr.ScVal.scvAddress(xdr.ScAddress.scAddressTypeAccount(persistentStorageAccountId))]);

    // Get the contract instance
    const contract = new Contract(getDeployedContractId());

    let ledgerKeyContractData = new xdr.LedgerKeyContractData({
        durability: xdr.ContractDataDurability.persistent(),
        contract: xdr.ScAddress.scAddressTypeContract(contract.address().toBuffer()),
        key: dataKey
    });

    let ledgerKeyXdr = xdr.LedgerKey.contractData(ledgerKeyContractData);

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
    .finally(() => console.log("restorePersistentTtl.ts script complete \n"));