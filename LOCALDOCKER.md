# Modifying a Local Stellar Quickstart node

- https://github.com/stellar/quickstart
- https://github.com/stellar/stellar-core/blob/master/docs/stellar-core_example.cfg
- https://github.com/stellar/stellar-core/blob/master/docs/software/ledger_query_examples.md
- https://github.com/stellar/stellar-core/blob/master/docs/software/commands.md
- https://developers.stellar.org/docs/validators/admin-guide/configuring

Native docker commands for additional customization options

```
docker run --rm -it \
    -p 8000:8000 \
    -p 6061:6061 \
    --name stellar \
    stellar/quickstart:testing \
    --standalone \
    --enable-soroban-rpc \
    --enable-stellar-rpc-admin-endpoint \
    --enable-soroban-diagnostic-events \
    --limits unlimited \
    --logs
```

Customize resource limits

```
docker exec -it stellar /bin/bash

```

## Upgrading Soroban Settings

- https://developers.stellar.org/docs/validators/admin-guide/soroban-settings
- https://github.com/stellar/stellar-core/blob/c6f474133738ae5f6d11b07963ca841909210273/docs/software/soroban-settings.md
- https://github.com/stellar/stellar-core/blob/c6f474133738ae5f6d11b07963ca841909210273/src/main/SettingsUpgradeUtils.cpp

Upgrading Soroban settings

```
curl -s "127.0.0.1:11626/sorobaninfo?format=upgrade_xdr"
```

```
stellar-xdr decode --type ConfigUpgradeSet - - output json-formatted
```

```
curl -s "127.0.0.1:11626/upgrades?mode=set&upgradetime=1970-01-01T00:00:00Z&[basefee=NUM]&[basereserve=NUM]&[maxtxsetsize=NUM]&[protocolversion=22]&[configupgradesetkey=ConfigUpgradeSetKey]"
```

