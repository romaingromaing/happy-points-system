use std::any::Any;
use std::os::unix::process::CommandExt;

use promkit::crossterm::style::{Attribute, Attributes};
use promkit::grapheme::StyledGraphemes;
use promkit::listbox::Listbox;
use promkit::preset::confirm::Confirm;
use promkit::preset::readline::Readline;
use promkit::style::StyleBuilder;
use promkit::suggest::Suggest;
use promkit::text_editor::Mode;

mod form_one;

fn main() -> anyhow::Result<()> {
    let base_prompt =
        Confirm::new("This command line tool will walk through executing various scripts to perform Extend TTL and Restore Archived data commands")
            .prompt()?.run();

    let listbox = Listbox::from_styled_graphemes(Vec::from([
        StyledGraphemes::from("Extend instance TTL"),
        StyledGraphemes::from("Extend persistence TTL")
    ]));


    /*    let t = match Terminal::start_session(&[Pane::new(listbox.items().clone(), 0)]) {
            Ok(terminal) => { terminal }
            Err(e) => { return Err(anyhow!("")) }
        };*/


    let mut p = Readline::default()
        .title("Extend TTL & Restore Archive data Script")
        .title_style(StyleBuilder::new()
            .attrs(Attributes::from(Attribute::Framed)
                .with(Attribute::Bold)).build())
        .edit_mode(Mode::Overwrite)
        .enable_history()

        .enable_suggest(Suggest::from_iter([
            "Extend instance TTL",
            "Extend persistence TTL",
        ])).text_editor_lines(3)
        .validator(
            |text| text.eq_ignore_ascii_case("Extend instance TTL")
                || text.eq_ignore_ascii_case("Extend persistence TTL"),
            |val| String::from("Select one"))
        .prompt()?.run()?;


    Ok(())
}