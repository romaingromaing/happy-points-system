# Demo of Stellar Smart Contract Storage

Storage on Stellar smart contracts is not simple.

This developer journey will walk you through not just the intricacies of Storage but also give you some great practical
knowledge about implementing your own point system. We will take a low-level approach to really examine some of the
fundamental concepts of Stellar Smart Contracts.

This tutorial is specifically designed for new Stellar developers!

While Stellar smart contract storage can seem pretty complicated at first, it offers a huge amount of opportunity for
optimization and minimization of invocation fees for your users!  So a little bit of work up front, will go a long way
down the line for your contract!

## Tests

Tests with logs enabled:

```
cargo test -- --nocapture
```

## Build and Deploy Contract with Stellar CLI

Run a local stellar network, deploy contract to local, invoke `set_balance_persistent()`, encode LedgerKey as
XDR and extend TTL of persistent storage data by key.

### Run Local Stellar Network

Run local Stellar network for testing

```
stellar container start local --limits testnet
```

Use local:

```
stellar network use local
```

Deploy to local standalone:

```
stellar contract deploy \
    --wasm target/wasm32-unknown-unknown/release/happy_points_system.wasm \
    --source alice \
    --network local
```

Invoke `set_balance_persistent()` function:

```
stellar contract invoke \
    --id CAWI33QKYJ2JV42O2KQG36MHBKQO4F3IKZPKT6C2HL7OI5VNAEM2SDE7 \
    --source alice \
    -- \
    set_balance_persistent \
    --amount 1000 \
    --addr GANUUSIQOCQOGQRV5KR7CO64SATSFLLPRRWX5XDKXYFZ7Y4XWTEALQOX
```

Invoke `get_balance_persistent()` function:

```
stellar contract invoke \
    --id CAWI33QKYJ2JV42O2KQG36MHBKQO4F3IKZPKT6C2HL7OI5VNAEM2SDE7 \
    --source alice \
    -- \
    get_balance_persistent \
    --addr GANUUSIQOCQOGQRV5KR7CO64SATSFLLPRRWX5XDKXYFZ7Y4XWTEALQOX
```

Encode LedgerKey JSON `ledgerkey.json` as XDR:

```
stellar xdr encode --type LedgerKey --input json --output single-base64 ledgerkey.json
```

Extend TTL of persistent storage by 10,000 ledgers:

```
stellar contract extend \
    --source alice \
    --id CABOIXXESAYVMNXP4HBU44DUTWFZAQAZJK5A44UFOR2KSGDHD5KUCQAJ \
    --key-xdr AAAABgAAAAGwZ1dyW0P7qAx913CFhpYGupGYPd3Fd1H8ujJu+y4QygAAABAAAAABAAAAAgAAAA8AAAAHQmFsYW5jZQAAAAASAAAAAAAAAAAbSkkQcKDjQjXqo/E73JAnIq1vjG1+3Gq+C5/jl7TIBQAAAAE= \
    --ledgers-to-extend 10000 \
    --durability persistent
```

Check TTL

```
stellar contract read \
    --output xdr \
    --id CABOIXXESAYVMNXP4HBU44DUTWFZAQAZJK5A44UFOR2KSGDHD5KUCQAJ \
    --key-xdr AAAABgAAAAEC5F7kkDFWNu/hw05wdJ2LkEAZSroOcoV0dKkYZx9VQQAAABAAAAABAAAAAgAAAA8AAAAHQmFsYW5jZQAAAAASAAAAAAAAAAAbSkkQcKDjQjXqo/E73JAnIq1vjG1+3Gq+C5/jl7TIBQAAAAE= \
    --durability persistent \
    --network testnet 
```