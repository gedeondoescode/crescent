use prisma_client_rust::migrations::DbPushError;
use thiserror::Error;

#[derive(Debug, Error)]
pub enum SlCoreError {
    #[error("Prisma New Client Error")]
    PrismaNewClientError(#[from] prisma_client_rust::NewClientError),
    #[error("Prisma Query Error")]
    PrismaQueryError(#[from] prisma_client_rust::QueryError),

    #[error("Tokio IO Error")]
    TokioError(#[from] tokio::io::Error),

    #[error("Tokio Join Error")]
    TokioJoinError(#[from] tokio::task::JoinError),

    #[error("DB Push Error")]
    DbPushError(#[from] DbPushError),
}