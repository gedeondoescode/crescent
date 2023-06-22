use crate::{prisma, Shared};
use rspc::{RouterBuilder, Type};
use serde::{Deserialize, Serialize};

pub fn mount() -> RouterBuilder<Shared> {
    RouterBuilder::<Shared>::new()
        .query("get", |t| {
            #[derive(Debug, Serialize, Deserialize, Type)]
            struct GetNotesByWorkspaceId {
                workspace_id: i32,
            }

            t(
                |ctx, GetNotesByWorkspaceId { workspace_id }: GetNotesByWorkspaceId| async move {
                    let result = ctx
                        .client
                        .note()
                        .find_many(vec![prisma::note::workspace_id::equals(workspace_id)])
                        .take(4)
                        .exec()
                        .await?;

                    Ok(result)
                },
            )
        })
        .mutation("create", |t| {
            #[derive(Debug, Serialize, Deserialize, Type)]
            struct CreateNote {
                workspace_id: i32,
            }

            t(|ctx, CreateNote { workspace_id }: CreateNote| async move {
                let notes_length = ctx
                    .client
                    .note()
                    .find_many(vec![prisma::note::workspace_id::equals(workspace_id)])
                    .exec()
                    .await?
                    .len();

                let title = format!("Untitled {}", notes_length + 1);

                let result = ctx
                    .client
                    .note()
                    .create(
                        title,
                        String::new(),
                        prisma::workspace::id::equals(workspace_id),
                        vec![],
                    )
                    .exec()
                    .await?;

                Ok(result)
            })
        })
}
