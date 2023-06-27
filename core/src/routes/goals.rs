use crate::{prisma, Shared};
use rspc::{RouterBuilder, Type};
use serde::{Deserialize, Serialize};

pub fn mount() -> RouterBuilder<Shared> {
    RouterBuilder::<Shared>::new().query("getAllGoals", |t| {
        #[derive(Debug, Serialize, Deserialize, Type)]
        struct GetAllGoalsArgs {
            workspace_id: i32,
        }

        t(|ctx, args: GetAllGoalsArgs| async move {
            let result = ctx
                .client
                .goal()
                .find_many(vec![prisma::goal::workspace_id::equals(args.workspace_id)])
                .exec()
                .await?;
            Ok(result)
        })
    })
}
