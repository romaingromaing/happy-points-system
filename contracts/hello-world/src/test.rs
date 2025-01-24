#![cfg(test)]

use soroban_sdk::{Address, Env};
use soroban_sdk::testutils::Address as _;
use soroban_sdk::testutils::arbitrary::std::println;
use soroban_sdk::testutils::storage::{Instance, Persistent};

use crate::{DataKey, TerriblePointSystem, TerriblePointSystemClient};

#[test]
fn test_set_balance() {
    const EXPECTED_VALUE: &u128 = &123;
    let env = Env::default();
    let contract_id = env.register(TerriblePointSystem, ());
    let client = TerriblePointSystemClient::new(&env, &contract_id);

    let user_1 = Address::generate(&env);
    client.set_balance(EXPECTED_VALUE, &user_1);

    let result = client.get_balance(&user_1);

    assert_eq!(&result, EXPECTED_VALUE);
}

#[test]
fn test_set_balance_persistent() {
    const EXPECTED_VALUE: &u128 = &123;
    let env = Env::default();
    let contract_id = env.register(TerriblePointSystem, ());
    let client = TerriblePointSystemClient::new(&env, &contract_id);

    let user_1 = Address::generate(&env);
    client.set_balance_persistent(EXPECTED_VALUE, &user_1);

    let result = client.get_balance_persistent(&user_1);

    assert_eq!(&result, EXPECTED_VALUE);
}

#[test]
fn test_set_balance_fees() {
    const EXPECTED_VALUE: &u128 = &123;
    let env = Env::default();
    let contract_id = env.register(TerriblePointSystem, ());
    let client = TerriblePointSystemClient::new(&env, &contract_id);

    let user_1 = Address::generate(&env);
    client.set_balance(EXPECTED_VALUE, &user_1);

    let rent = &env.cost_estimate().fee().persistent_entry_rent;
    let total_fee = &env.cost_estimate().fee().total;
    let rent_bytes = &env.cost_estimate().resources().persistent_rent_ledger_bytes;
    let writes = &env.cost_estimate().resources().write_bytes;

    println!("test_set_balance_fees");
    println!("persistent_entry_rent: {}", rent);
    println!("total_fee: {}", total_fee);
    println!("persistent_rent_ledger_bytes: {}", rent_bytes);
    println!("write bytes: {}", writes);

    env.as_contract(&contract_id, || {
        let ttl = env.storage().instance().get_ttl();
        println!("Instance TTL: {}", ttl);
    });
}

#[test]
fn test_set_balance_persistent_fees() {
    const EXPECTED_VALUE: &u128 = &123;
    let env = Env::default();
    let contract_id = env.register(TerriblePointSystem, ());
    let client = TerriblePointSystemClient::new(&env, &contract_id);

    let user_1 = Address::generate(&env);
    client.set_balance_persistent(EXPECTED_VALUE, &user_1);

    let rent = &env.cost_estimate().fee().persistent_entry_rent;
    let total_fee = &env.cost_estimate().fee().total;
    let rent_ledger_bytes = &env.cost_estimate().resources().persistent_rent_ledger_bytes;
    let writes = &env.cost_estimate().resources().write_bytes;

    println!("test_set_balance_persistent_fees");
    println!("persistent_entry_rent: {}", rent);
    println!("total_fee: {}", total_fee);
    println!("persistent_rent_ledger_bytes: {}", rent_ledger_bytes);
    println!("write bytes: {}", writes);

    env.as_contract(&contract_id, || {
        let key = DataKey::Balance(user_1);
        let ttl = env.storage().persistent().get_ttl(&key);
        println!("Persistent TTL: {}", ttl);
    });
}

#[test]
fn set_persistent_extended() {
    const EXPECTED_VALUE: &u128 = &123;
    let env = Env::default();
    let contract_id = env.register(TerriblePointSystem, ());
    let client = TerriblePointSystemClient::new(&env, &contract_id);

    let user_1 = Address::generate(&env);
    client.set_persistent_extended(EXPECTED_VALUE, &user_1);

    let rent = &env.cost_estimate().fee().persistent_entry_rent;
    let total_fee = &env.cost_estimate().fee().total;
    let rent_ledger_bytes = &env.cost_estimate().resources().persistent_rent_ledger_bytes;
    let writes = &env.cost_estimate().resources().write_bytes;

    println!("test_set_balance_persistent_fees_extended_ttl");
    println!("persistent_entry_rent: {}", rent);
    println!("total_fee: {}", total_fee);
    println!("persistent_rent_ledger_bytes: {}", rent_ledger_bytes);
    println!("write bytes: {}", writes);

    env.as_contract(&contract_id, || {
        let key = DataKey::Balance(user_1);
        let ttl = env.storage().persistent().get_ttl(&key);
        println!("Persistent Extended TTL: {}", ttl);
    });
}

#[test]
fn set_instance_extended() {
    const EXPECTED_VALUE: &u128 = &123;
    let env = Env::default();
    let contract_id = env.register(TerriblePointSystem, ());
    let client = TerriblePointSystemClient::new(&env, &contract_id);

    let user_1 = Address::generate(&env);
    client.set_instance_extended(EXPECTED_VALUE, &user_1);

    let rent = &env.cost_estimate().fee().persistent_entry_rent;
    let total_fee = &env.cost_estimate().fee().total;
    let rent_ledger_bytes = &env.cost_estimate().resources().persistent_rent_ledger_bytes;
    let writes = &env.cost_estimate().resources().write_bytes;

    println!("test_set_balance_instance_fees_extended_ttl");
    println!("persistent_entry_rent: {}", rent);
    println!("total_fee: {}", total_fee);
    println!("persistent_rent_ledger_bytes: {}", rent_ledger_bytes);
    println!("write bytes: {}", writes);

    env.as_contract(&contract_id, || {
        let ttl = env.storage().instance().get_ttl();
        println!("Instance Extended TTL: {}", ttl);
    });
}
