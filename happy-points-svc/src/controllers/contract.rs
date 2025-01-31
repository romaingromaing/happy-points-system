#![allow(clippy::missing_errors_doc)]
#![allow(clippy::unnecessary_struct_initialization)]
#![allow(clippy::unused_async)]

use axum::debug_handler;
use loco_rs::prelude::*;

use crate::views;

#[debug_handler]
pub async fn index(State(_ctx): State<AppContext>) -> Result<Response> {
    format::text("Contracts")
}

pub async fn render_contract(ViewEngine(v): ViewEngine<TeraView>) -> Result<impl IntoResponse> {
    views::contract::contract(v)
}

pub fn routes() -> Routes {
    Routes::new()
        .prefix("contracts")
        .add("/", get(render_contract))
}
