use crate::prisma::{new_client_with_url, PrismaClient};

use crate::utils::{errors::SlCoreError, get_app_dir::get_streamline_dir};

pub async fn new_client() -> Result<PrismaClient, SlCoreError> {
    let profile_url = get_streamline_dir().join("sl-profile.db");

    log::info!(
        "Connecting to profile database at {}",
        profile_url.display()
    );

    tokio::fs::create_dir_all(profile_url.parent().unwrap()).await?;

    if !profile_url.exists() {
        tokio::fs::File::create(profile_url.clone()).await?;
    }
    let client =
        new_client_with_url(&("file:".to_string() + profile_url.to_str().unwrap())).await?;

    Ok(client)
}
