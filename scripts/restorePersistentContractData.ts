import {Contract, Operation, SorobanDataBuilder, xdr} from "@stellar/stellar-sdk";
import {getAssembledSignedTransaction, getRpcServer, pollForTransactionCompletion} from "./util/rpcServerFactory";
import {getDeployedContractId} from "./util/argumentProcessor";


module.exports = (async function () {
    const rpcServer = await getRpcServer();

    const contract = new Contract(getDeployedContractId());

    let ledgerKeyContractData = new xdr.LedgerKeyContractData({
        durability: xdr.ContractDataDurability.persistent(),
        contract: xdr.ScAddress.scAddressTypeContract(contract.address().toBuffer()),
        key: xdr.ScVal.scvString("ledger_key_contract_instance")
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