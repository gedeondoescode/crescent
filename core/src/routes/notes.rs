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
        .mutation("edit", |t| {
            #[derive(Debug, Serialize, Deserialize, Type)]
            struct EditNoteArgs {
                id: i32,
                title: String,
                content: String

            }
            t(|ctx, args: EditNoteArgs| async move {
                let result = ctx.client.note().update(prisma::note::id::equals(args.id), vec![
                    prisma::note::title::set(args.title),
                    prisma::note::content::set(args.content),
                ]).exec().await?;

                Ok(result)
            })
        })
        .mutation("delete", |t| {
            #[derive(Debug, Deserialize, Type)]
            struct DeleteNoteArgs {
                id: i32
            }

            t(|ctx, args: DeleteNoteArgs | async move {
                let result = ctx.client.note().delete(prisma::note::id::equals(args.id)).exec().await?;
                Ok(result)
            })
        })
}
