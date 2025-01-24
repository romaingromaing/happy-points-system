#![no_std]
use soroban_sdk::{Address, contract, contractimpl, contracttype, Env};

#[contract]
pub struct TerribleToken;

#[contractimpl]
impl TerribleToken {
    pub fn set_balance(env: &Env, amount: u128, addr: Address) {
        let key = DataKey::Balance(addr);
        env.storage().instance().set::<DataKey, u128>(&key, &amount);
    }

    pub fn get_balance(env: &Env, addr: Address) -> u128 {
        let key = DataKey::Balance(addr);
        env.storage().instance().get::<DataKey, u128>(&key).unwrap_or(0)
    }
}

#[derive(Clone)]
#[contracttype]
pub enum DataKey {
    Allowance(u128),
    Balance(Address),
}

mod test;
