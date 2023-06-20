use prisma::PrismaClient;
use std::sync::Arc;

pub mod db;

#[allow(unused, warnings)]
pub mod prisma;

pub mod routes;
pub mod utils;

pub struct Shared {
    pub client: Arc<PrismaClient>,
}
