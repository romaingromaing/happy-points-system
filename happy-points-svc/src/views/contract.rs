use loco_rs::prelude::*;

pub fn contract(v: impl ViewRenderer) -> Result<impl IntoResponse> {
    format::render().view(&v, "contract/contract.html", data!({"version" : "22"}))
}