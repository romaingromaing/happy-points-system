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

### Setting .env

Create `.env` file for use in `rpcServerFactory.ts`

```
cp .env.example .env
```

## Extending TTL for Instance Storage

The script to extend instance storage TTL for a contract instance and instance storage.

Parameters:

- contract_id (required) - Deployed contract ID
- SOURCE_KEYPAIR (required)

Command:

```
cd scripts
pnpx ts-node extendInstanceTtl.ts [contract_id] [SOURCE_KEYPAIR]
```

## Extending TTL for Persistent Storage

The script to extend persistent storage TTL for a specific key.

Parameters:

- contract_id (required)
- SOURCE_KEYPAIR (required)
- PERSISTENT_STORAGE_KEY (required)

Command:

```
cd scripts
pnpx ts-node extendPersistentTtl.ts [contract_id] [SOURCE_KEYPAIR] [PERSISTENT_STORAGE_KEY]
```