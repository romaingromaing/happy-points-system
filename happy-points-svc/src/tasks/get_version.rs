use loco_rs::Error::InternalServerError;
use loco_rs::prelude::*;
use stellar_rpc_client::Client;

pub struct GetVersion;
#[async_trait]
impl Task for GetVersion {
    fn task(&self) -> TaskInfo {
        TaskInfo {
            name: "get_version".to_string(),
            detail: "Task generator".to_string(),
        }
    }

    async fn run(&self, _app_context: &AppContext, _vars: &task::Vars) -> Result<()> {
        println!("Task GetVersion generated");

        let client = match Client::new("https://soroban-testnet.stellar.org") {
            Ok(stellar_rpc_client) => { stellar_rpc_client.clone() }
            Err(_) => { return Err(InternalServerError) }
        };

        println!("Ledger Response: {}", client.base_url());

        match client.get_latest_ledger().await {
            Ok(res) => { println!("Latest Ledger: {}", res.sequence) }
            Err(_) => { return Err(InternalServerError) }
        };

        Ok(())
    }
}
