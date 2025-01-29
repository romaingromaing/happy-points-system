import {Contract, xdr} from "@stellar/stellar-sdk";
import {getDeployedContractId, getPersistentStorageKey} from "./util/argumentProcessor";


module.exports = (async function () {

    let persistentStorageAccountId = getPersistentStorageKey();

    // Persistent DataKey XDR value
    let dataKey = xdr.ScVal.scvVec([xdr.ScVal.scvSymbol("Balance"),
        xdr.ScVal.scvAddress(xdr.ScAddress.scAddressTypeAccount(persistentStorageAccountId))]);

    // Get the contract instance
    const contract = new Contract(getDeployedContractId());

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