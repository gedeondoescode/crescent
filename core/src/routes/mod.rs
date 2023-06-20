use crate::Shared;
use rspc::{Config, Router};
use std::{path::PathBuf, sync::Arc};

pub mod hello;

pub fn start_router() -> Arc<Router<Shared>> {
    let router = Router::<Shared>::new()
        .config(Config::new().export_ts_bindings(
            PathBuf::from(env!("CARGO_MANIFEST_DIR")).join("../src/lib/bindings.ts"),
        ))
        .merge("hello.", hello::mount())
        .query("version", |t| {
            t(|_, _: ()| async move { env!("CARGO_PKG_VERSION") })
        });

    router.build().arced()
}
