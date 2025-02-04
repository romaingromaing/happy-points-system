#![cfg(test)]

use soroban_sdk::{Address, Env};
use soroban_sdk::testutils::Address as _;
use soroban_sdk::testutils::arbitrary::std::println;
use soroban_sdk::testutils::storage::{Instance, Persistent};

use crate::{DataKey, HappyPointSystem, HappyPointSystemClient};

const EXPECTED_VALUE: &u128 = &123;

fn setup_env() -> (Env, HappyPointSystemClient<'static>, Address) {
    let env: Env = Env::default();
    let contract_id: &Address = &env.register(HappyPointSystem, ());
    let client: HappyPointSystemClient = HappyPointSystemClient::new(&env, &contract_id);
    let user_1: Address = Address::generate(&env);
    (env.clone(), client, user_1.clone())
}

#[test]
fn test_set_balance() {
    let (_env, client, user_1) = setup_env();

    client.set_balance(EXPECTED_VALUE, &user_1);
    let result = client.get_balance(&user_1);
    assert_eq!(&result, EXPECTED_VALUE);
}

#[test]
fn test_set_balance_persistent() {
    let (_env, client, user_1) = setup_env();

    client.set_balance_persistent(EXPECTED_VALUE, &user_1);
    let result = client.get_balance_persistent(&user_1);
    assert_eq!(&result, EXPECTED_VALUE);
}

#[test]
fn test_set_balance_fees() {
    let (env, client, user_1) = setup_env();
    client.set_balance(EXPECTED_VALUE, &user_1);
    let contract_id: Address = client.address;

    let rent = &env.cost_estimate().fee().persistent_entry_rent;
    let total_fee = &env.cost_estimate().fee().total;
    let rent_bytes = &env.cost_estimate().resources().persistent_rent_ledger_bytes;
    let writes = &env.cost_estimate().resources().write_bytes;

    let ttl: u32 = env.as_contract(&contract_id, || {
        let ttl = env.storage().instance().get_ttl().clone();
        ttl
    });

    println!(
        "\n test_set_balance_fees \n \
            ___________________________________________ \n \
            persistent_entry_rent: {} \n \
            total_fee: {} \n \
            rent_bytes: {} \n \
            write bytes: {} \n \
            Instance TTL: {} \n",
        rent, total_fee, rent_bytes, writes, ttl
    );
}

#[test]
fn test_set_balance_persistent_fees() {
    let (env, client, user_1) = setup_env();
    client.set_balance_persistent(EXPECTED_VALUE, &user_1);
    let contract_id = client.address;

    let rent = &env.cost_estimate().fee().persistent_entry_rent;
    let total_fee = &env.cost_estimate().fee().total;
    let rent_ledger_bytes = &env.cost_estimate().resources().persistent_rent_ledger_bytes;
    let writes = &env.cost_estimate().resources().write_bytes;

    let ttl: u32 = env.as_contract(&contract_id, || {
        let key = DataKey::Balance(user_1);
        let ttl = env.storage().persistent().get_ttl(&key);
        ttl
    });

    println!(
        "\n test_set_balance_persistent_fees \n \
            ___________________________________________ \n \
            persistent_entry_rent: {} \n \
            total_fee: {} \n \
            persistent_rent_ledger_bytes: {} \n \
            write bytes: {} \n \
            Persistent TTL: {} \n",
        rent, total_fee, rent_ledger_bytes, writes, ttl
    );
}

#[test]
fn set_persistent_extended() {
    let (env, client, user_1) = setup_env();
    client.set_persistent_extended(EXPECTED_VALUE, &user_1);
    let contract_id = client.address;

    let rent = &env.cost_estimate().fee().persistent_entry_rent;
    let total_fee = &env.cost_estimate().fee().total;
    let rent_ledger_bytes = &env.cost_estimate().resources().persistent_rent_ledger_bytes;
    let writes = &env.cost_estimate().resources().write_bytes;

    let ttl: u32 = env.as_contract(&contract_id, || {
        let key = DataKey::Balance(user_1);
        let ttl = env.storage().persistent().get_ttl(&key);
        assert_eq!(&ttl, &10000);

        ttl
    });

    println!(
        "\n test_set_balance_persistent_fees_extended_ttl \n \
            ___________________________________________ \n \
            persistent_entry_rent: {} \n \
            total_fee: {} \n \
            persistent_rent_ledger_bytes: {} \n \
            write bytes: {} \n \
            Persistent Extended TTL: {} \n",
        rent, total_fee, rent_ledger_bytes, writes, ttl
    );
}

#[test]
fn set_instance_extended() {
    let (env, client, user_1) = setup_env();
    client.set_instance_extended(EXPECTED_VALUE, &user_1);
    let contract_id = client.address;

    let rent = &env.cost_estimate().fee().persistent_entry_rent;
    let total_fee = &env.cost_estimate().fee().total;
    let rent_ledger_bytes = &env.cost_estimate().resources().persistent_rent_ledger_bytes;
    let writes = &env.cost_estimate().resources().write_bytes;

    let ttl: u32 = env.as_contract(&contract_id, || {
        let ttl = env.storage().instance().get_ttl();
        ttl
    });

    println!(
        "\n test_set_balance_instance_fees_extended_ttl \n \
            ___________________________________________ \n \
            persistent_entry_rent: {} \n \
            total_fee: {} \n \
            persistent_rent_ledger_bytes: {} \n \
            write bytes: {} \n \
            Instance Extended TTL: {} \n",
        rent, total_fee, rent_ledger_bytes, writes, ttl
    );
}
