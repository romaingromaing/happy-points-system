import {Networks, Operation, rpc, TransactionBuilder, xdr} from "@stellar/stellar-sdk";
import dotenv from "dotenv";
import {getSourceKeypair} from "./argumentProcessor";

export const NETWORK_PASSPHRASE = Networks.STANDALONE;
export const fee = "200100"; // Base fee plus resource fee

export async function getAssembledSignedTransaction(sorobanData: xdr.SorobanTransactionData,
                                                    rpcServer: rpc.Server,
                                                    operation: xdr.Operation<Operation.ExtendFootprintTTL> | xdr.Operation<Operation.RestoreFootprint>) {

    let account =
        await rpcServer.getAccount(getSourceKeypair().publicKey());

    const transaction =
        new TransactionBuilder(account, {
            fee,
            networkPassphrase: NETWORK_PASSPHRASE,
        })
            .setSorobanData(sorobanData)
            .addOperation(
                operation,
            )
            .setTimeout(30)
            .build();


    // Simulate and assemble transaction
    const ttlSimResponse: rpc.Api.SimulateTransactionResponse =
        await rpcServer.simulateTransaction(transaction);
    const assembledTransaction =
        rpc.assembleTransaction(transaction, ttlSimResponse)
            .build();

    // Sign assembled transaction
    assembledTransaction.sign(getSourceKeypair());
    return assembledTransaction;
}

export async function getRpcServer() {
    dotenv.config();
    const RPC_SERVER_URL = process.env.RPC_SERVER_URL;
    console.log("Using RPC Server URL: " + RPC_SERVER_URL);

    const rpcServer = new rpc.Server(RPC_SERVER_URL, {
        allowHttp: true,
        timeout: 30,
    });
    await rpcServer.getHealth();
    return rpcServer;
}

export async function pollForTransactionCompletion(rpcServer: rpc.Server,
                                                   result: rpc.Api.SendTransactionResponse) {
    return rpcServer.pollTransaction(result.hash, {
        attempts: 10,
        sleepStrategy: rpc.LinearSleepStrategy
    }).then((finalStatus) => {
        switch (finalStatus.status) {
            case rpc.Api.GetTransactionStatus.FAILED:
                console.log(finalStatus.status);
                break;
            case rpc.Api.GetTransactionStatus.NOT_FOUND:
                console.log("Waiting... ", finalStatus.txHash, " ", finalStatus.status);
                break;
            case rpc.Api.GetTransactionStatus.SUCCESS:

                let operationMetadata = finalStatus
                    .resultMetaXdr.v3().operations().at(0).toXDR("base64");

                console.log("\n Operation Meta: \n",
                    operationMetadata, "\n");
                console.log("Result: \n",
                    finalStatus.resultXdr.toXDR("base64"), "\n");

                return finalStatus.status;
        }
    }).catch(reason => console.log(reason));
}