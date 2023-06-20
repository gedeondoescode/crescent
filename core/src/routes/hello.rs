use rspc::RouterBuilder;

use crate::Shared;

// use std::sync::Arc;

pub fn mount() -> RouterBuilder<Shared> {
    let r = RouterBuilder::<Shared>::new();
    r.query("sayHi", |t| t(|_, _: ()| "Hello World"))
}
