import {Keypair} from "@stellar/stellar-sdk";


export function getDeployedContractId() {
    if (!process.argv[2]) {
        console.error(`You must provide a contractId as a parameter \n`);
        return;
    }

    return process.argv[2];
}

export function getSourceKeypair() {
    if (!process.argv[3]) {
        console.error(`You must provide a sourceKeypair as a parameter \n`);
        return;
    }

    return Keypair.fromSecret(process.argv[3]);
}

export function getPersistentStorageKeyString() {
    if (!process.argv[4]) {
        console.error(`You must provide a persistentStorageKey as a parameter \n`);
        return;
    }

    return process.argv[4];
}