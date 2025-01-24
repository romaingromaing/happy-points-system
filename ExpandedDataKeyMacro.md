``` rust
/Users/chris.anatalio/.cargo/bin/cargo expand --lib --color=always --theme=Dracula --tests
   Compiling hello-world v0.0.0 (/Users/chris.anatalio/projects/terrible-token/contracts/hello-world)
    Finished `test` profile [unoptimized + debuginfo] target(s) in 0.51s

#![feature(prelude_import)]
#![no_std]
#[prelude_import]
use core::prelude::rust_2021::*;
#[macro_use]
extern crate core;
extern crate compiler_builtins as _;
use soroban_sdk::{Address, contract, contractimpl, contracttype, Env};
pub struct TerriblePointSystem;
///TerriblePointSystemArgs is a type for building arg lists for functions defined in "TerriblePointSystem".
pub struct TerriblePointSystemArgs;
///TerriblePointSystemClient is a client for calling the contract defined in "TerriblePointSystem".
pub struct TerriblePointSystemClient<'a> {
    pub env: soroban_sdk::Env,
    pub address: soroban_sdk::Address,
    #[doc(hidden)]
    set_auths: Option<&'a [soroban_sdk::xdr::SorobanAuthorizationEntry]>,
    #[doc(hidden)]
    mock_auths: Option<&'a [soroban_sdk::testutils::MockAuth<'a>]>,
    #[doc(hidden)]
    mock_all_auths: bool,
    #[doc(hidden)]
    allow_non_root_auth: bool,
}
impl<'a> TerriblePointSystemClient<'a> {
    pub fn new(env: &soroban_sdk::Env, address: &soroban_sdk::Address) -> Self {
        Self {
            env: env.clone(),
            address: address.clone(),
            set_auths: None,
            mock_auths: None,
            mock_all_auths: false,
            allow_non_root_auth: false,
        }
    }
    /// Set authorizations in the environment which will be consumed by
    /// contracts when they invoke `Address::require_auth` or
    /// `Address::require_auth_for_args` functions.
    ///
    /// Requires valid signatures for the authorization to be successful.
    /// To mock auth without requiring valid signatures, use `mock_auths`.
    ///
    /// See `soroban_sdk::Env::set_auths` for more details and examples.
    pub fn set_auths(
        &self,
        auths: &'a [soroban_sdk::xdr::SorobanAuthorizationEntry],
    ) -> Self {
        Self {
            env: self.env.clone(),
            address: self.address.clone(),
            set_auths: Some(auths),
            mock_auths: self.mock_auths.clone(),
            mock_all_auths: false,
            allow_non_root_auth: false,
        }
    }
    /// Mock authorizations in the environment which will cause matching invokes
    /// of `Address::require_auth` and `Address::require_auth_for_args` to
    /// pass.
    ///
    /// See `soroban_sdk::Env::set_auths` for more details and examples.
    pub fn mock_auths(
        &self,
        mock_auths: &'a [soroban_sdk::testutils::MockAuth<'a>],
    ) -> Self {
        Self {
            env: self.env.clone(),
            address: self.address.clone(),
            set_auths: self.set_auths.clone(),
            mock_auths: Some(mock_auths),
            mock_all_auths: false,
            allow_non_root_auth: false,
        }
    }
    /// Mock all calls to the `Address::require_auth` and
    /// `Address::require_auth_for_args` functions in invoked contracts,
    /// having them succeed as if authorization was provided.
    ///
    /// See `soroban_sdk::Env::mock_all_auths` for more details and
    /// examples.
    pub fn mock_all_auths(&self) -> Self {
        Self {
            env: self.env.clone(),
            address: self.address.clone(),
            set_auths: None,
            mock_auths: None,
            mock_all_auths: true,
            allow_non_root_auth: false,
        }
    }
    /// A version of `mock_all_auths` that allows authorizations that
    /// are not present in the root invocation.
    ///
    /// Refer to `mock_all_auths` documentation for details and
    /// prefer using `mock_all_auths` unless non-root authorization is
    /// required.
    ///
    /// See `soroban_sdk::Env::mock_all_auths_allowing_non_root_auth`
    /// for more details and examples.
    pub fn mock_all_auths_allowing_non_root_auth(&self) -> Self {
        Self {
            env: self.env.clone(),
            address: self.address.clone(),
            set_auths: None,
            mock_auths: None,
            mock_all_auths: true,
            allow_non_root_auth: true,
        }
    }
}
mod __terriblepointsystem_fn_set_registry {
    use super::*;
    extern crate std;
    use std::sync::Mutex;
    use std::collections::BTreeMap;
    pub type F = soroban_sdk::testutils::ContractFunctionF;
    static FUNCS: Mutex<BTreeMap<&'static str, &'static F>> = Mutex::new(
        BTreeMap::new(),
    );
    pub fn register(name: &'static str, func: &'static F) {
        FUNCS.lock().unwrap().insert(name, func);
    }
    pub fn call(
        name: &str,
        env: soroban_sdk::Env,
        args: &[soroban_sdk::Val],
    ) -> Option<soroban_sdk::Val> {
        let fopt: Option<&'static F> = FUNCS
            .lock()
            .unwrap()
            .get(name)
            .map(|f| f.clone());
        fopt.map(|f| f(env, args))
    }
}
impl soroban_sdk::testutils::ContractFunctionRegister for TerriblePointSystem {
    fn register(
        name: &'static str,
        func: &'static __terriblepointsystem_fn_set_registry::F,
    ) {
        __terriblepointsystem_fn_set_registry::register(name, func);
    }
}
#[doc(hidden)]
impl soroban_sdk::testutils::ContractFunctionSet for TerriblePointSystem {
    fn call(
        &self,
        func: &str,
        env: soroban_sdk::Env,
        args: &[soroban_sdk::Val],
    ) -> Option<soroban_sdk::Val> {
        __terriblepointsystem_fn_set_registry::call(func, env, args)
    }
}
impl TerriblePointSystem {
    pub fn set_balance(env: &Env, amount: u128, addr: Address) {
        let key = DataKey::Balance(addr);
        env.storage().instance().set::<DataKey, u128>(&key, &amount);
    }
    pub fn get_balance(env: &Env, addr: Address) -> u128 {
        let key = DataKey::Balance(addr);
        env.storage().instance().get::<DataKey, u128>(&key).unwrap_or(0)
    }
}
#[doc(hidden)]
#[allow(non_snake_case)]
#[allow(non_upper_case_globals)]
pub static __SPEC_XDR_FN_SET_BALANCE: [u8; 68usize] = TerriblePointSystem::spec_xdr_set_balance();
impl TerriblePointSystem {
    #[allow(non_snake_case)]
    pub const fn spec_xdr_set_balance() -> [u8; 68usize] {
        *b"\0\0\0\0\0\0\0\0\0\0\0\x0bset_balance\0\0\0\0\x02\0\0\0\0\0\0\0\x06amount\0\0\0\0\0\n\0\0\0\0\0\0\0\x04addr\0\0\0\x13\0\0\0\0"
    }
}
#[doc(hidden)]
#[allow(non_snake_case)]
#[allow(non_upper_case_globals)]
pub static __SPEC_XDR_FN_GET_BALANCE: [u8; 52usize] = TerriblePointSystem::spec_xdr_get_balance();
impl TerriblePointSystem {
    #[allow(non_snake_case)]
    pub const fn spec_xdr_get_balance() -> [u8; 52usize] {
        *b"\0\0\0\0\0\0\0\0\0\0\0\x0bget_balance\0\0\0\0\x01\0\0\0\0\0\0\0\x04addr\0\0\0\x13\0\0\0\x01\0\0\0\n"
    }
}
impl<'a> TerriblePointSystemClient<'a> {
    pub fn set_balance(&self, amount: &u128, addr: &Address) -> () {
        use core::ops::Not;
        let old_auth_manager = self
            .env
            .in_contract()
            .not()
            .then(|| self.env.host().snapshot_auth_manager().unwrap());
        {
            if let Some(set_auths) = self.set_auths {
                self.env.set_auths(set_auths);
            }
            if let Some(mock_auths) = self.mock_auths {
                self.env.mock_auths(mock_auths);
            }
            if self.mock_all_auths {
                if self.allow_non_root_auth {
                    self.env.mock_all_auths_allowing_non_root_auth();
                } else {
                    self.env.mock_all_auths();
                }
            }
        }
        use soroban_sdk::{IntoVal, FromVal};
        let res = self
            .env
            .invoke_contract(
                &self.address,
                &{ soroban_sdk::Symbol::new(&self.env, "set_balance") },
                ::soroban_sdk::Vec::from_array(
                    &self.env,
                    [amount.into_val(&self.env), addr.into_val(&self.env)],
                ),
            );
        if let Some(old_auth_manager) = old_auth_manager {
            self.env.host().set_auth_manager(old_auth_manager).unwrap();
        }
        res
    }
    pub fn try_set_balance(
        &self,
        amount: &u128,
        addr: &Address,
    ) -> Result<
        Result<
            (),
            <() as soroban_sdk::TryFromVal<soroban_sdk::Env, soroban_sdk::Val>>::Error,
        >,
        Result<soroban_sdk::Error, soroban_sdk::InvokeError>,
    > {
        use core::ops::Not;
        let old_auth_manager = self
            .env
            .in_contract()
            .not()
            .then(|| self.env.host().snapshot_auth_manager().unwrap());
        {
            if let Some(set_auths) = self.set_auths {
                self.env.set_auths(set_auths);
            }
            if let Some(mock_auths) = self.mock_auths {
                self.env.mock_auths(mock_auths);
            }
            if self.mock_all_auths {
                self.env.mock_all_auths();
            }
        }
        use soroban_sdk::{IntoVal, FromVal};
        let res = self
            .env
            .try_invoke_contract(
                &self.address,
                &{ soroban_sdk::Symbol::new(&self.env, "set_balance") },
                ::soroban_sdk::Vec::from_array(
                    &self.env,
                    [amount.into_val(&self.env), addr.into_val(&self.env)],
                ),
            );
        if let Some(old_auth_manager) = old_auth_manager {
            self.env.host().set_auth_manager(old_auth_manager).unwrap();
        }
        res
    }
    pub fn get_balance(&self, addr: &Address) -> u128 {
        use core::ops::Not;
        let old_auth_manager = self
            .env
            .in_contract()
            .not()
            .then(|| self.env.host().snapshot_auth_manager().unwrap());
        {
            if let Some(set_auths) = self.set_auths {
                self.env.set_auths(set_auths);
            }
            if let Some(mock_auths) = self.mock_auths {
                self.env.mock_auths(mock_auths);
            }
            if self.mock_all_auths {
                if self.allow_non_root_auth {
                    self.env.mock_all_auths_allowing_non_root_auth();
                } else {
                    self.env.mock_all_auths();
                }
            }
        }
        use soroban_sdk::{IntoVal, FromVal};
        let res = self
            .env
            .invoke_contract(
                &self.address,
                &{ soroban_sdk::Symbol::new(&self.env, "get_balance") },
                ::soroban_sdk::Vec::from_array(&self.env, [addr.into_val(&self.env)]),
            );
        if let Some(old_auth_manager) = old_auth_manager {
            self.env.host().set_auth_manager(old_auth_manager).unwrap();
        }
        res
    }
    pub fn try_get_balance(
        &self,
        addr: &Address,
    ) -> Result<
        Result<
            u128,
            <u128 as soroban_sdk::TryFromVal<soroban_sdk::Env, soroban_sdk::Val>>::Error,
        >,
        Result<soroban_sdk::Error, soroban_sdk::InvokeError>,
    > {
        use core::ops::Not;
        let old_auth_manager = self
            .env
            .in_contract()
            .not()
            .then(|| self.env.host().snapshot_auth_manager().unwrap());
        {
            if let Some(set_auths) = self.set_auths {
                self.env.set_auths(set_auths);
            }
            if let Some(mock_auths) = self.mock_auths {
                self.env.mock_auths(mock_auths);
            }
            if self.mock_all_auths {
                self.env.mock_all_auths();
            }
        }
        use soroban_sdk::{IntoVal, FromVal};
        let res = self
            .env
            .try_invoke_contract(
                &self.address,
                &{ soroban_sdk::Symbol::new(&self.env, "get_balance") },
                ::soroban_sdk::Vec::from_array(&self.env, [addr.into_val(&self.env)]),
            );
        if let Some(old_auth_manager) = old_auth_manager {
            self.env.host().set_auth_manager(old_auth_manager).unwrap();
        }
        res
    }
}
impl TerriblePointSystemArgs {
    #[inline(always)]
    #[allow(clippy::unused_unit)]
    pub fn set_balance<'i>(
        amount: &'i u128,
        addr: &'i Address,
    ) -> (&'i u128, &'i Address) {
        (amount, addr)
    }
    #[inline(always)]
    #[allow(clippy::unused_unit)]
    pub fn get_balance<'i>(addr: &'i Address) -> (&'i Address,) {
        (addr,)
    }
}
#[doc(hidden)]
pub mod __set_balance {
    use super::*;
    #[deprecated(
        note = "use `TerriblePointSystemClient::new(&env, &contract_id).set_balance` instead"
    )]
    pub fn invoke_raw(
        env: soroban_sdk::Env,
        arg_0: soroban_sdk::Val,
        arg_1: soroban_sdk::Val,
    ) -> soroban_sdk::Val {
        <_ as soroban_sdk::IntoVal<
            soroban_sdk::Env,
            soroban_sdk::Val,
        >>::into_val(
            #[allow(deprecated)]
            &<super::TerriblePointSystem>::set_balance(
                &env,
                <_ as soroban_sdk::unwrap::UnwrapOptimized>::unwrap_optimized(
                    <_ as soroban_sdk::TryFromValForContractFn<
                        soroban_sdk::Env,
                        soroban_sdk::Val,
                    >>::try_from_val_for_contract_fn(&env, &arg_0),
                ),
                <_ as soroban_sdk::unwrap::UnwrapOptimized>::unwrap_optimized(
                    <_ as soroban_sdk::TryFromValForContractFn<
                        soroban_sdk::Env,
                        soroban_sdk::Val,
                    >>::try_from_val_for_contract_fn(&env, &arg_1),
                ),
            ),
            &env,
        )
    }
    #[deprecated(
        note = "use `TerriblePointSystemClient::new(&env, &contract_id).set_balance` instead"
    )]
    pub fn invoke_raw_slice(
        env: soroban_sdk::Env,
        args: &[soroban_sdk::Val],
    ) -> soroban_sdk::Val {
        if args.len() != 2usize {
            {
                ::core::panicking::panic_fmt(
                    format_args!(
                        "invalid number of input arguments: {0} expected, got {1}",
                        2usize,
                        args.len(),
                    ),
                );
            };
        }
        #[allow(deprecated)] invoke_raw(env, args[0usize], args[1usize])
    }
    #[deprecated(
        note = "use `TerriblePointSystemClient::new(&env, &contract_id).set_balance` instead"
    )]
    pub extern "C" fn invoke_raw_extern(
        env: soroban_sdk::Env,
        arg_0: soroban_sdk::Val,
        arg_1: soroban_sdk::Val,
    ) -> soroban_sdk::Val {
        #[allow(deprecated)] invoke_raw(env, arg_0, arg_1)
    }
    use super::*;
}
#[doc(hidden)]
pub mod __get_balance {
    use super::*;
    #[deprecated(
        note = "use `TerriblePointSystemClient::new(&env, &contract_id).get_balance` instead"
    )]
    pub fn invoke_raw(
        env: soroban_sdk::Env,
        arg_0: soroban_sdk::Val,
    ) -> soroban_sdk::Val {
        <_ as soroban_sdk::IntoVal<
            soroban_sdk::Env,
            soroban_sdk::Val,
        >>::into_val(
            #[allow(deprecated)]
            &<super::TerriblePointSystem>::get_balance(
                &env,
                <_ as soroban_sdk::unwrap::UnwrapOptimized>::unwrap_optimized(
                    <_ as soroban_sdk::TryFromValForContractFn<
                        soroban_sdk::Env,
                        soroban_sdk::Val,
                    >>::try_from_val_for_contract_fn(&env, &arg_0),
                ),
            ),
            &env,
        )
    }
    #[deprecated(
        note = "use `TerriblePointSystemClient::new(&env, &contract_id).get_balance` instead"
    )]
    pub fn invoke_raw_slice(
        env: soroban_sdk::Env,
        args: &[soroban_sdk::Val],
    ) -> soroban_sdk::Val {
        if args.len() != 1usize {
            {
                ::core::panicking::panic_fmt(
                    format_args!(
                        "invalid number of input arguments: {0} expected, got {1}",
                        1usize,
                        args.len(),
                    ),
                );
            };
        }
        #[allow(deprecated)] invoke_raw(env, args[0usize])
    }
    #[deprecated(
        note = "use `TerriblePointSystemClient::new(&env, &contract_id).get_balance` instead"
    )]
    pub extern "C" fn invoke_raw_extern(
        env: soroban_sdk::Env,
        arg_0: soroban_sdk::Val,
    ) -> soroban_sdk::Val {
        #[allow(deprecated)] invoke_raw(env, arg_0)
    }
    use super::*;
}
#[doc(hidden)]
#[allow(non_snake_case)]
extern fn __TerriblePointSystem__291d6d18d0304196deb28524152947399aff44fd47134df018b6c691ec8f3d98_ctor() {
    <TerriblePointSystem as soroban_sdk::testutils::ContractFunctionRegister>::register(
        "set_balance",
        #[allow(deprecated)]
        &__set_balance::invoke_raw_slice,
    );
    <TerriblePointSystem as soroban_sdk::testutils::ContractFunctionRegister>::register(
        "get_balance",
        #[allow(deprecated)]
        &__get_balance::invoke_raw_slice,
    );
}
#[used]
#[allow(non_upper_case_globals, non_snake_case)]
#[doc(hidden)]
#[link_section = "__DATA,__mod_init_func"]
static __TerriblePointSystem__291d6d18d0304196deb28524152947399aff44fd47134df018b6c691ec8f3d98_ctor___rust_ctor___ctor: unsafe extern "C" fn() -> usize = {
    #[allow(non_snake_case)]
    unsafe extern "C" fn __TerriblePointSystem__291d6d18d0304196deb28524152947399aff44fd47134df018b6c691ec8f3d98_ctor___rust_ctor___ctor() -> usize {
        __TerriblePointSystem__291d6d18d0304196deb28524152947399aff44fd47134df018b6c691ec8f3d98_ctor();
        0
    }
    __TerriblePointSystem__291d6d18d0304196deb28524152947399aff44fd47134df018b6c691ec8f3d98_ctor___rust_ctor___ctor
};
pub enum DataKey {
    Balance(Address),
}
pub static __SPEC_XDR_TYPE_DATAKEY: [u8; 56usize] = DataKey::spec_xdr();
impl DataKey {
    pub const fn spec_xdr() -> [u8; 56usize] {
        *b"\0\0\0\x02\0\0\0\0\0\0\0\0\0\0\0\x07DataKey\0\0\0\0\x01\0\0\0\x01\0\0\0\0\0\0\0\x07Balance\0\0\0\0\x01\0\0\0\x13"
    }
}
impl soroban_sdk::TryFromVal<soroban_sdk::Env, soroban_sdk::Val> for DataKey {
    type Error = soroban_sdk::ConversionError;
    #[inline(always)]
    fn try_from_val(
        env: &soroban_sdk::Env,
        val: &soroban_sdk::Val,
    ) -> Result<Self, soroban_sdk::ConversionError> {
        use soroban_sdk::{EnvBase, TryIntoVal, TryFromVal};
        const CASES: &'static [&'static str] = &["Balance"];
        let vec: soroban_sdk::Vec<soroban_sdk::Val> = val.try_into_val(env)?;
        let mut iter = vec.try_iter();
        let discriminant: soroban_sdk::Symbol = iter
            .next()
            .ok_or(soroban_sdk::ConversionError)??
            .try_into_val(env)
            .map_err(|_| soroban_sdk::ConversionError)?;
        Ok(
            match u32::from(
                env.symbol_index_in_strs(discriminant.to_symbol_val(), CASES)?,
            ) as usize
            {
                0 => {
                    if iter.len() > 1usize {
                        return Err(soroban_sdk::ConversionError);
                    }
                    Self::Balance(
                        iter
                            .next()
                            .ok_or(soroban_sdk::ConversionError)??
                            .try_into_val(env)?,
                    )
                }
                _ => Err(soroban_sdk::ConversionError {})?,
            },
        )
    }
}
impl soroban_sdk::TryFromVal<soroban_sdk::Env, DataKey> for soroban_sdk::Val {
    type Error = soroban_sdk::ConversionError;
    #[inline(always)]
    fn try_from_val(
        env: &soroban_sdk::Env,
        val: &DataKey,
    ) -> Result<Self, soroban_sdk::ConversionError> {
        use soroban_sdk::{TryIntoVal, TryFromVal};
        match val {
            DataKey::Balance(ref value0) => {
                let tup: (soroban_sdk::Val, soroban_sdk::Val) = (
                    soroban_sdk::Symbol::try_from_val(env, &"Balance")?.to_val(),
                    value0.try_into_val(env)?,
                );
                tup.try_into_val(env).map_err(Into::into)
            }
        }
    }
}
impl soroban_sdk::TryFromVal<soroban_sdk::Env, soroban_sdk::xdr::ScVec> for DataKey {
    type Error = soroban_sdk::xdr::Error;
    #[inline(always)]
    fn try_from_val(
        env: &soroban_sdk::Env,
        val: &soroban_sdk::xdr::ScVec,
    ) -> Result<Self, soroban_sdk::xdr::Error> {
        use soroban_sdk::xdr::Validate;
        use soroban_sdk::TryIntoVal;
        let vec = val;
        let mut iter = vec.iter();
        let discriminant: soroban_sdk::xdr::ScSymbol = iter
            .next()
            .ok_or(soroban_sdk::xdr::Error::Invalid)?
            .clone()
            .try_into()
            .map_err(|_| soroban_sdk::xdr::Error::Invalid)?;
        let discriminant_name: &str = &discriminant.to_utf8_string()?;
        Ok(
            match discriminant_name {
                "Balance" => {
                    if iter.len() > 1usize {
                        return Err(soroban_sdk::xdr::Error::Invalid);
                    }
                    let rv0: soroban_sdk::Val = iter
                        .next()
                        .ok_or(soroban_sdk::xdr::Error::Invalid)?
                        .try_into_val(env)
                        .map_err(|_| soroban_sdk::xdr::Error::Invalid)?;
                    Self::Balance(
                        rv0
                            .try_into_val(env)
                            .map_err(|_| soroban_sdk::xdr::Error::Invalid)?,
                    )
                }
                _ => Err(soroban_sdk::xdr::Error::Invalid)?,
            },
        )
    }
}
impl soroban_sdk::TryFromVal<soroban_sdk::Env, soroban_sdk::xdr::ScVal> for DataKey {
    type Error = soroban_sdk::xdr::Error;
    #[inline(always)]
    fn try_from_val(
        env: &soroban_sdk::Env,
        val: &soroban_sdk::xdr::ScVal,
    ) -> Result<Self, soroban_sdk::xdr::Error> {
        if let soroban_sdk::xdr::ScVal::Vec(Some(vec)) = val {
            <_ as soroban_sdk::TryFromVal<_, _>>::try_from_val(env, vec)
        } else {
            Err(soroban_sdk::xdr::Error::Invalid)
        }
    }
}
impl TryFrom<&DataKey> for soroban_sdk::xdr::ScVec {
    type Error = soroban_sdk::xdr::Error;
    #[inline(always)]
    fn try_from(val: &DataKey) -> Result<Self, soroban_sdk::xdr::Error> {
        extern crate alloc;
        Ok(
            match val {
                DataKey::Balance(value0) => {
                    (
                        soroban_sdk::xdr::ScSymbol(
                            "Balance"
                                .try_into()
                                .map_err(|_| soroban_sdk::xdr::Error::Invalid)?,
                        ),
                        value0,
                    )
                        .try_into()
                        .map_err(|_| soroban_sdk::xdr::Error::Invalid)?
                }
            },
        )
    }
}
impl TryFrom<DataKey> for soroban_sdk::xdr::ScVec {
    type Error = soroban_sdk::xdr::Error;
    #[inline(always)]
    fn try_from(val: DataKey) -> Result<Self, soroban_sdk::xdr::Error> {
        (&val).try_into()
    }
}
impl TryFrom<&DataKey> for soroban_sdk::xdr::ScVal {
    type Error = soroban_sdk::xdr::Error;
    #[inline(always)]
    fn try_from(val: &DataKey) -> Result<Self, soroban_sdk::xdr::Error> {
        Ok(soroban_sdk::xdr::ScVal::Vec(Some(val.try_into()?)))
    }
}
impl TryFrom<DataKey> for soroban_sdk::xdr::ScVal {
    type Error = soroban_sdk::xdr::Error;
    #[inline(always)]
    fn try_from(val: DataKey) -> Result<Self, soroban_sdk::xdr::Error> {
        (&val).try_into()
    }
}
const _: () = {
    use soroban_sdk::testutils::arbitrary::std;
    use soroban_sdk::testutils::arbitrary::arbitrary;
    pub enum ArbitraryDataKey {
        Balance(
            <Address as soroban_sdk::testutils::arbitrary::SorobanArbitrary>::Prototype,
        ),
    }
    #[automatically_derived]
    impl ::core::fmt::Debug for ArbitraryDataKey {
        #[inline]
        fn fmt(&self, f: &mut ::core::fmt::Formatter) -> ::core::fmt::Result {
            match self {
                ArbitraryDataKey::Balance(__self_0) => {
                    ::core::fmt::Formatter::debug_tuple_field1_finish(
                        f,
                        "Balance",
                        &__self_0,
                    )
                }
            }
        }
    }
    #[automatically_derived]
    impl ::core::clone::Clone for ArbitraryDataKey {
        #[inline]
        fn clone(&self) -> ArbitraryDataKey {
            match self {
                ArbitraryDataKey::Balance(__self_0) => {
                    ArbitraryDataKey::Balance(::core::clone::Clone::clone(__self_0))
                }
            }
        }
    }
    #[automatically_derived]
    impl ::core::cmp::Eq for ArbitraryDataKey {
        #[inline]
        #[doc(hidden)]
        #[coverage(off)]
        fn assert_receiver_is_total_eq(&self) -> () {
            let _: ::core::cmp::AssertParamIsEq<
                <Address as soroban_sdk::testutils::arbitrary::SorobanArbitrary>::Prototype,
            >;
        }
    }
    #[automatically_derived]
    impl ::core::marker::StructuralPartialEq for ArbitraryDataKey {}
    #[automatically_derived]
    impl ::core::cmp::PartialEq for ArbitraryDataKey {
        #[inline]
        fn eq(&self, other: &ArbitraryDataKey) -> bool {
            match (self, other) {
                (
                    ArbitraryDataKey::Balance(__self_0),
                    ArbitraryDataKey::Balance(__arg1_0),
                ) => __self_0 == __arg1_0,
            }
        }
    }
    #[automatically_derived]
    impl ::core::cmp::Ord for ArbitraryDataKey {
        #[inline]
        fn cmp(&self, other: &ArbitraryDataKey) -> ::core::cmp::Ordering {
            match (self, other) {
                (
                    ArbitraryDataKey::Balance(__self_0),
                    ArbitraryDataKey::Balance(__arg1_0),
                ) => ::core::cmp::Ord::cmp(__self_0, __arg1_0),
            }
        }
    }
    #[automatically_derived]
    impl ::core::cmp::PartialOrd for ArbitraryDataKey {
        #[inline]
        fn partial_cmp(
            &self,
            other: &ArbitraryDataKey,
        ) -> ::core::option::Option<::core::cmp::Ordering> {
            match (self, other) {
                (
                    ArbitraryDataKey::Balance(__self_0),
                    ArbitraryDataKey::Balance(__arg1_0),
                ) => ::core::cmp::PartialOrd::partial_cmp(__self_0, __arg1_0),
            }
        }
    }
    const _: () = {
        #[allow(non_upper_case_globals)]
        const RECURSIVE_COUNT_ArbitraryDataKey: ::std::thread::LocalKey<
            std::cell::Cell<u32>,
        > = {
            #[inline]
            fn __init() -> std::cell::Cell<u32> {
                std::cell::Cell::new(0)
            }
            unsafe {
                use ::std::mem::needs_drop;
                use ::std::thread::LocalKey;
                use ::std::thread::local_impl::LazyStorage;
                LocalKey::new(const {
                    if needs_drop::<std::cell::Cell<u32>>() {
                        |init| {
                            #[thread_local]
                            static VAL: LazyStorage<std::cell::Cell<u32>, ()> = LazyStorage::new();
                            VAL.get_or_init(init, __init)
                        }
                    } else {
                        |init| {
                            #[thread_local]
                            static VAL: LazyStorage<std::cell::Cell<u32>, !> = LazyStorage::new();
                            VAL.get_or_init(init, __init)
                        }
                    }
                })
            }
        };
        #[automatically_derived]
        impl<'arbitrary> arbitrary::Arbitrary<'arbitrary> for ArbitraryDataKey {
            fn arbitrary(
                u: &mut arbitrary::Unstructured<'arbitrary>,
            ) -> arbitrary::Result<Self> {
                let guard_against_recursion = u.is_empty();
                if guard_against_recursion {
                    RECURSIVE_COUNT_ArbitraryDataKey
                        .with(|count| {
                            if count.get() > 0 {
                                return Err(arbitrary::Error::NotEnoughData);
                            }
                            count.set(count.get() + 1);
                            Ok(())
                        })?;
                }
                let result = (|| {
                    Ok(
                        match (u64::from(<u32 as arbitrary::Arbitrary>::arbitrary(u)?)
                            * 1u64) >> 32
                        {
                            0u64 => {
                                ArbitraryDataKey::Balance(
                                    arbitrary::Arbitrary::arbitrary(u)?,
                                )
                            }
                            _ => {
                                ::core::panicking::panic(
                                    "internal error: entered unreachable code",
                                )
                            }
                        },
                    )
                })();
                if guard_against_recursion {
                    RECURSIVE_COUNT_ArbitraryDataKey
                        .with(|count| {
                            count.set(count.get() - 1);
                        });
                }
                result
            }
            fn arbitrary_take_rest(
                mut u: arbitrary::Unstructured<'arbitrary>,
            ) -> arbitrary::Result<Self> {
                let guard_against_recursion = u.is_empty();
                if guard_against_recursion {
                    RECURSIVE_COUNT_ArbitraryDataKey
                        .with(|count| {
                            if count.get() > 0 {
                                return Err(arbitrary::Error::NotEnoughData);
                            }
                            count.set(count.get() + 1);
                            Ok(())
                        })?;
                }
                let result = (|| {
                    Ok(
                        match (u64::from(
                            <u32 as arbitrary::Arbitrary>::arbitrary(&mut u)?,
                        ) * 1u64) >> 32
                        {
                            0u64 => {
                                ArbitraryDataKey::Balance(
                                    arbitrary::Arbitrary::arbitrary_take_rest(u)?,
                                )
                            }
                            _ => {
                                ::core::panicking::panic(
                                    "internal error: entered unreachable code",
                                )
                            }
                        },
                    )
                })();
                if guard_against_recursion {
                    RECURSIVE_COUNT_ArbitraryDataKey
                        .with(|count| {
                            count.set(count.get() - 1);
                        });
                }
                result
            }
            #[inline]
            fn size_hint(depth: usize) -> (usize, Option<usize>) {
                arbitrary::size_hint::and(
                    <u32 as arbitrary::Arbitrary>::size_hint(depth),
                    arbitrary::size_hint::recursion_guard(
                        depth,
                        |depth| {
                            arbitrary::size_hint::or_all(
                                &[
                                    arbitrary::size_hint::and_all(
                                        &[
                                            <<Address as soroban_sdk::testutils::arbitrary::SorobanArbitrary>::Prototype as arbitrary::Arbitrary>::size_hint(
                                                depth,
                                            ),
                                        ],
                                    ),
                                ],
                            )
                        },
                    ),
                )
            }
        }
    };
    impl soroban_sdk::testutils::arbitrary::SorobanArbitrary for DataKey {
        type Prototype = ArbitraryDataKey;
    }
    impl soroban_sdk::TryFromVal<soroban_sdk::Env, ArbitraryDataKey> for DataKey {
        type Error = soroban_sdk::ConversionError;
        fn try_from_val(
            env: &soroban_sdk::Env,
            v: &ArbitraryDataKey,
        ) -> std::result::Result<Self, Self::Error> {
            Ok(
                match v {
                    ArbitraryDataKey::Balance(field_0) => {
                        DataKey::Balance(soroban_sdk::IntoVal::into_val(field_0, env))
                    }
                },
            )
        }
    }
};
#[automatically_derived]
impl ::core::clone::Clone for DataKey {
    #[inline]
    fn clone(&self) -> DataKey {
        match self {
            DataKey::Balance(__self_0) => {
                DataKey::Balance(::core::clone::Clone::clone(__self_0))
            }
        }
    }
}
mod test {
    #![cfg(test)]
    use soroban_sdk::{Address, Env};
    use soroban_sdk::testutils::Address as _;
    use crate::{TerriblePointSystem, TerriblePointSystemClient};
    extern crate test;
    #[cfg(test)]
    #[rustc_test_marker = "test::test_set_balance"]
    pub const test_set_balance: test::TestDescAndFn = test::TestDescAndFn {
        desc: test::TestDesc {
            name: test::StaticTestName("test::test_set_balance"),
            ignore: false,
            ignore_message: ::core::option::Option::None,
            source_file: "contracts/hello-world/src/test.rs",
            start_line: 9usize,
            start_col: 4usize,
            end_line: 9usize,
            end_col: 20usize,
            compile_fail: false,
            no_run: false,
            should_panic: test::ShouldPanic::No,
            test_type: test::TestType::UnitTest,
        },
        testfn: test::StaticTestFn(
            #[coverage(off)]
            || test::assert_test_result(test_set_balance()),
        ),
    };
    fn test_set_balance() {
        const EXPECTED_VALUE: &u128 = &123;
        let env = Env::default();
        let contract_id = env.register(TerriblePointSystem, ());
        let client = TerriblePointSystemClient::new(&env, &contract_id);
        let user_1 = Address::generate(&env);
        client.set_balance(EXPECTED_VALUE, &user_1);
        let result = client.get_balance(&user_1);
        match (&&result, &EXPECTED_VALUE) {
            (left_val, right_val) => {
                if !(*left_val == *right_val) {
                    let kind = ::core::panicking::AssertKind::Eq;
                    ::core::panicking::assert_failed(
                        kind,
                        &*left_val,
                        &*right_val,
                        ::core::option::Option::None,
                    );
                }
            }
        };
    }
}
#[rustc_main]
#[coverage(off)]
pub fn main() -> () {
    extern crate test;
    test::test_main_static(&[&test_set_balance])
}

Process finished with exit code 0
```