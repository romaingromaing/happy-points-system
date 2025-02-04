import {Contract, Operation, SorobanDataBuilder} from "@stellar/stellar-sdk";
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
        await getAssembledSignedTransaction(sorobanData, rpcServer,
            Operation.extendFootprintTtl({
                extendTo: 2999499,
            }));
    const result =
        await rpcServer.sendTransaction(assembledTransaction);

    return await pollForTransactionCompletion(rpcServer, result);
})().then(value => console.log(value))
    .catch(reason => console.log(reason))
    .finally(() => console.log("extendInstanceTtl.ts script complete \n"));