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

## Build and Deploy Contract

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
    --id CBRS2MTQ42YB767ZWXAJBPJAZUVEH2WOVJUTNSQRNQHUSRAUFC3NWMEN \
    --source alice \
    --network standalone \
    -- \
    set_balance_persistent \
    --amount 1000 \
    --addr GANUUSIQOCQOGQRV5KR7CO64SATSFLLPRRWX5XDKXYFZ7Y4XWTEALQOX
```

Invoke `get_balance_persistent()` function:

```
stellar contract invoke \
    --id CBRS2MTQ42YB767ZWXAJBPJAZUVEH2WOVJUTNSQRNQHUSRAUFC3NWMEN \
    --source alice \
    --network standalone \
    -- \
    get_balance_persistent \
    --addr GANUUSIQOCQOGQRV5KR7CO64SATSFLLPRRWX5XDKXYFZ7Y4XWTEALQOX
```

CBRS2MTQ42YB767ZWXAJBPJAZUVEH2WOVJUTNSQRNQHUSRAUFC3NWMEN

SBOATEDJ3XP6MATQSD7MOQ3HDBBO6QFXOHLAV4ZZ7SWU437TFKQXRYZG