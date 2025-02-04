#![no_std]

use soroban_sdk::{Address, contract, contractimpl, contracttype, Env};

#[contract]
pub struct HappyPointSystem;

#[contractimpl]
impl HappyPointSystem {
    pub fn set_balance(env: &Env, amount: u128, addr: Address) {
        let key = DataKey::Balance(addr);
        env.storage().instance().set::<DataKey, u128>(&key, &amount);
    }

    pub fn get_balance(env: &Env, addr: Address) -> u128 {
        let key = DataKey::Balance(addr);
        env.storage()
            .instance()
            .get::<DataKey, u128>(&key)
            .unwrap_or(0)
    }

    pub fn set_balance_persistent(env: &Env, amount: u128, addr: Address) {
        let key = DataKey::Balance(addr);
        env.storage()
            .persistent()
            .set::<DataKey, u128>(&key, &amount);
    }

    pub fn get_balance_persistent(env: &Env, addr: Address) -> u128 {
        let key = DataKey::Balance(addr);
        let balance = env
            .storage()
            .persistent()
            .get::<DataKey, u128>(&key)
            .unwrap_or(0);
        Self::extend_ttl(env, key);

        balance
    }

    pub fn set_instance_extended(env: &Env, amount: u128, addr: Address) {
        let key = DataKey::Balance(addr);
        env.storage().instance().set::<DataKey, u128>(&key, &amount);
        env.storage().instance().extend_ttl(4095, 10000);
    }

    pub fn set_persistent_extended(env: &Env, amount: u128, addr: Address) {
        let key = DataKey::Balance(addr);
        env.storage()
            .persistent()
            .set::<DataKey, u128>(&key, &amount);
        Self::extend_ttl(env, key);
        env.storage().instance().extend_ttl(4095, 10000);
    }

    fn extend_ttl(env: &Env, key: DataKey) {
        env.storage().persistent().extend_ttl(&key, 4095, 10000);
    }
}

#[derive(Clone)]
#[contracttype]
pub enum DataKey {
    Balance(Address),
}

mod test;
