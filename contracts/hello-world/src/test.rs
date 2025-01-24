#![cfg(test)]

use soroban_sdk::{Address, Env};
use soroban_sdk::testutils::Address as _;

use crate::{TerribleToken, TerribleTokenClient};

#[test]
fn test() {
    const EXPECTED_VALUE: &u128 = &123;
    let env = Env::default();
    let contract_id = env.register(TerribleToken, ());
    let client = TerribleTokenClient::new(&env, &contract_id);

    let user_1 = Address::generate(&env);
    client.set_balance(EXPECTED_VALUE, &user_1);

    let result = client.get_balance(&user_1);


    assert_eq!(&result, EXPECTED_VALUE)
}
