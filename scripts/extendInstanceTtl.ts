import {Contract, SorobanDataBuilder} from "@stellar/stellar-sdk";
import {getAssembledSignedTransaction, getRpcServer, pollForTransactionCompletion} from "./util/rpcServerFactory";
import {getDeployedContractId} from "./util/argumentProcessor";


module.exports = (async function () {

    const rpcServer = await getRpcServer();

    const contract = new Contract(getDeployedContractId());
    const instance = contract.getFootprint();

    // Set the Soroban data and create an operation to extend the contract's TTL
    const sorobanData = new SorobanDataBuilder()
        .setResourceFee(200_000)
        .setReadOnly([instance])
        .build();

    let assembledTransaction =
        await getAssembledSignedTransaction(sorobanData, rpcServer, 30000);
    const result =
        await rpcServer.sendTransaction(assembledTransaction);

    let getTransactionResponse =
        await pollForTransactionCompletion(rpcServer, result);

    console.log(getTransactionResponse);

})().catch(reason => console.log(reason));