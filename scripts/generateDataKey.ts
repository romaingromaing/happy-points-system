import {Contract, Keypair, xdr} from "@stellar/stellar-sdk";
import {getDeployedContractId, getPersistentStorageKeyString, getSourceKeypair} from "./util/argumentProcessor";


module.exports = (async function () {

    const contractId: string = getDeployedContractId();
    const sourceKeypair = getSourceKeypair();
    const persistentStorageKeyString: string = getPersistentStorageKeyString();
    let persistentStorageAccountId = Keypair.fromPublicKey(persistentStorageKeyString)
        .xdrAccountId();

    // Persistent DataKey XDR value
    let dataKey = xdr.ScVal.scvVec([xdr.ScVal.scvSymbol("Balance"),
        xdr.ScVal.scvAddress(xdr.ScAddress.scAddressTypeAccount(persistentStorageAccountId))]);

    // Get the contract instance
    const contract = new Contract(contractId);

    let ledgerKeyContractData = new xdr.LedgerKeyContractData({
        durability: xdr.ContractDataDurability.persistent(),
        contract: xdr.ScAddress.scAddressTypeContract(contract.address().toBuffer()),
        key: dataKey
    });

    let ledgerKeyXdr = xdr.LedgerKey.contractData(ledgerKeyContractData);

    console.log(ledgerKeyXdr.toXDR("base64"));

    let validateXDR = xdr.LedgerKey.validateXDR(ledgerKeyXdr.toXDR("base64"), "base64");
    console.log(validateXDR);

    
})();