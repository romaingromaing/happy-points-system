import {rpc} from "@stellar/stellar-sdk";
import dotenv from "dotenv";

export function getRpcServer() {
    dotenv.config();
    const RPC_SERVER_URL = process.env.RPC_SERVER_URL;
    console.log("Using RPC Server URL: " + RPC_SERVER_URL);

    return new rpc.Server(RPC_SERVER_URL, {
        allowHttp: true,
        timeout: 30,
    });
}

export function pollForTransactionCompletion(rpcServer: rpc.Server, result: rpc.Api.SendTransactionResponse) {
    return rpcServer.pollTransaction(result.hash, {
        attempts: 5,
        sleepStrategy: rpc.BasicSleepStrategy
    }).then((finalStatus) => {
        switch (finalStatus.status) {
            case rpc.Api.GetTransactionStatus.FAILED:
                console.log(finalStatus.status);
                break;
            case rpc.Api.GetTransactionStatus.NOT_FOUND:
                console.log("Waiting...");
                break;
            case rpc.Api.GetTransactionStatus.SUCCESS:
                let contractEvents = finalStatus.resultMetaXdr;

                console.log(
                    "Transaction Result: ",
                    JSON.stringify(contractEvents, null, 2),
                );

                return finalStatus.status;
        }
    });
}