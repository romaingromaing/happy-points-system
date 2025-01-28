# Extend Smart Contract Storage TTL via Stellar SDK Example

Scripts to extend TTL programatically via `ts-node` scripts for smart contracts deployed on testnet.

## Run Local Stellar Network

Run local Stellar network for testing

```
stellar container start local
```

Use local:

```
stellar network use local
```

Test local stellar network:

```
curl "http://localhost:8000"
```

## Extending TTL for Instance Storage

The script to extend instance storage TTL for a contract instance and instance storage.

Parameters:

- CONTRACT_ID (required) - Deployed contract ID on testnext
- SOURCE_KEYPAIR (required)

Command:

```
cd scripts
pnpx ts-node extendInstanceTtl.ts [CONTRACT_ID] [SOURCE_KEYPAIR]
```

## Extending TTL for Persistent Storage

The script to extend persistent storage TTL for a specific key.

Parameters:

- CONTRACT_ID (required)
- SOURCE_KEYPAIR (required)
- PERSISTENT_STORAGE_KEY (required)

Command:

```
cd scripts
pnpx ts-node extendPersistentTtl.ts [CONTRACT_ID] [SOURCE_KEYPAIR] [PERSISTENT_STORAGE_KEY]
```