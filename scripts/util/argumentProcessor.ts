import {Keypair, xdr} from "@stellar/stellar-sdk";


export function getDeployedContractId(): string {
    if (!process.argv[2]) {
        console.error(`You must provide a contractId as a parameter \n`);
        return;
    }

    return process.argv[2];
}

export function getSourceKeypair(): Keypair {
    if (!process.argv[3]) {
        console.error(`You must provide a sourceKeypair as a parameter \n`);
        return;
    }

    return Keypair.fromSecret(process.argv[3]);
}

export function getPersistentStorageKey(): xdr.PublicKey {
    if (!process.argv[4]) {
        console.error(`You must provide a persistentStorageKey as a parameter \n`);
        return;
    }

    return Keypair.fromPublicKey(process.argv[4])
        .xdrAccountId();
}