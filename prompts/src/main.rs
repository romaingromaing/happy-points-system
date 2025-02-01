use std::any::Any;
use std::os::unix::process::CommandExt;

use promkit::crossterm::style::{Attribute, Attributes};
use promkit::grapheme::StyledGraphemes;
use promkit::preset::confirm::Confirm;
use promkit::preset::listbox::Listbox;
use promkit::preset::readline::Readline;
use promkit::style::StyleBuilder;

mod form_one;

fn main() -> anyhow::Result<()> {
    let base_prompt =
        Confirm::new("This command line tool will walk through executing various scripts to perform Extend TTL and Restore Archived data commands")
            .prompt()?.run();

    let listbox = Listbox::new(Vec::from([
        StyledGraphemes::from("Extend TTL"),
        StyledGraphemes::from("Restore Archived Data"),
    ]))
    .title("Choose operation")
    .listbox_lines(3)
    .prompt()
    .unwrap()
    .run();

    let listbox_two = Listbox::new(Vec::from([
        StyledGraphemes::from("Extend instance TTL"),
        StyledGraphemes::from("Extend persistence TTL"),
    ]))
    .title("Extend TTL for what time of Smart Contract Storage?")
    .title_style(
        StyleBuilder::new()
            .attrs(Attributes::from(Attribute::Framed).with(Attribute::Bold))
            .build(),
    )
    .listbox_lines(3)
    .prompt()
    .unwrap()
    .run();

    Readline::default()
        .title("Enter Deployed CONTRACT_ID")
        .prefix("Contract ID ❯❯ ")
        .prompt()
        .unwrap()
        .run()?;
    Readline::default()
        .title("Enter Secret Key for testnet")
        .prefix("Secret Key ❯❯ ")
        .prompt()
        .unwrap()
        .run()?;
    Readline::default()
        .title("Enter Public Key for testnet")
        .prefix("Public Key ❯❯ ")
        .prompt()
        .unwrap()
        .run()?;

    println!("\n Executing script...");
    println!(
        "pnpx ts-node extendPersistentTtl.ts [CONTRACT_ID] [SOURCE_KEYPAIR] [PERSISTENT_STORAGE_KEY]"
    );

    Ok(())
}
