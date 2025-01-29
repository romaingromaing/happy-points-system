import {Contract, Operation, SorobanDataBuilder} from "@stellar/stellar-sdk";
import {getDeployedContractId} from "./util/argumentProcessor";
import {getAssembledSignedTransaction, getRpcServer, pollForTransactionCompletion} from "./util/rpcServerFactory";


module.exports = (async function restoreInstanceData() {
    const rpcServer = await getRpcServer();

    const contract = new Contract(getDeployedContractId());
    const instance = contract.getFootprint();

    // Set the Soroban data and create an operation to restore the contract instance
    const sorobanData = new SorobanDataBuilder()
        .setResourceFee(200_000)
        .setReadWrite([instance])
        .build();

    let assembledTransaction =
        await getAssembledSignedTransaction(sorobanData, rpcServer,
            Operation.restoreFootprint({}));

    const result =
        await rpcServer.sendTransaction(assembledTransaction);
    console.log("Transaction Hash: " + result.hash);

    return await pollForTransactionCompletion(rpcServer, result)
        .then(async res => {
            if (res === "SUCCESS") {
                // Set the Soroban data and create an operation to extend the contract's TTL
                const extendTTLSorobanData = new SorobanDataBuilder()
                    .setResourceFee(200_000)
                    .setReadOnly([instance])
                    .build();

                await getAssembledSignedTransaction(extendTTLSorobanData, rpcServer,
                    Operation.extendFootprintTtl({
                        extendTo: 200,
                    }));
            }
        });
})()
    .then(value => console.log(value))
    .catch(reason => console.log(reason))
    .finally(() => console.log("restoreInstanceData.ts script complete \n"));