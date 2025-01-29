import {Operation, SorobanDataBuilder, xdr} from "@stellar/stellar-sdk";
import {getAssembledSignedTransaction, getRpcServer, pollForTransactionCompletion} from "./util/rpcServerFactory";


module.exports = (async function () {
    const rpcServer = await getRpcServer();

    let coldArchiveBucketEntry = xdr.ColdArchiveBucketEntry.coldArchiveHash(new xdr.ColdArchiveHashEntry({
        hash: Buffer.from("89f50330aab569d6773274d4bfbfe901f236252150ce6b4c82e093f700000000", "hex"),
        level: 2794397078,
        index: 0
    }));

    try {
        coldArchiveBucketEntry.archivedLeaf();
    } catch (error) {
        console.log("archivedLeaf must be present to restore");
        return;
    }

    let ledgerEntry = new xdr.LedgerEntry({
        data: coldArchiveBucketEntry.archivedLeaf().archivedEntry().data(),
        ext: coldArchiveBucketEntry.archivedLeaf().archivedEntry().ext(),
        lastModifiedLedgerSeq: coldArchiveBucketEntry.archivedLeaf().archivedEntry().lastModifiedLedgerSeq()
    });

    let ledgerKey = xdr.LedgerKey.data(new xdr.LedgerKeyData({
        dataName: ledgerEntry.data().data().dataName(),
        accountId: ledgerEntry.data().account().accountId()
    }));

    // Set the Soroban data and create an operation to extend the contract's TTL
    const sorobanData = new SorobanDataBuilder()
        .setResourceFee(200_000)
        .setReadWrite([ledgerKey])
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
    .catch(reason => {
        console.log(reason)
    })
    .finally(() => console.log("restorePersistentTtl.ts script complete \n"));