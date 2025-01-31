use loco_rs::prelude::*;

use crate::models::_entities::storages;

/// Render a list view of `storages`.
///
/// # Errors
///
/// When there is an issue with rendering the view.
pub fn list(v: &impl ViewRenderer, items: &Vec<storages::Model>) -> Result<Response> {
    format::render().view(v, "storage/list.html", data!({"items": items}))
}

/// Render a single `storage` view.
///
/// # Errors
///
/// When there is an issue with rendering the view.
pub fn show(v: &impl ViewRenderer, item: &storages::Model) -> Result<Response> {
    format::render().view(v, "storage/show.html", data!({"item": item}))
}

/// Render a `storage` create form.
///
/// # Errors
///
/// When there is an issue with rendering the view.
pub fn create(v: &impl ViewRenderer) -> Result<Response> {
    format::render().view(v, "storage/create.html", data!({}))
}

/// Render a `storage` edit form.
///
/// # Errors
///
/// When there is an issue with rendering the view.
pub fn edit(v: &impl ViewRenderer, item: &storages::Model) -> Result<Response> {
    format::render().view(v, "storage/edit.html", data!({"item": item}))
}
