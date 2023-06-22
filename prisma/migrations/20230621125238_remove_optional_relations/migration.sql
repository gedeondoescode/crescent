/*
  Warnings:

  - Made the column `content` on table `note` required. This step will fail if there are existing NULL values in that column.
  - Made the column `workspace_id` on table `note` required. This step will fail if there are existing NULL values in that column.
  - Made the column `content` on table `task` required. This step will fail if there are existing NULL values in that column.
  - Made the column `goal_id` on table `task` required. This step will fail if there are existing NULL values in that column.
  - Made the column `workspace_id` on table `task` required. This step will fail if there are existing NULL values in that column.
  - Made the column `profile_id` on table `workspace` required. This step will fail if there are existing NULL values in that column.
  - Made the column `workspace_id` on table `goal` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_note" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "date_created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_updated" DATETIME NOT NULL,
    "workspace_id" INTEGER NOT NULL,
    CONSTRAINT "note_workspace_id_fkey" FOREIGN KEY ("workspace_id") REFERENCES "workspace" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_note" ("content", "date_created", "date_updated", "id", "title", "workspace_id") SELECT "content", "date_created", "date_updated", "id", "title", "workspace_id" FROM "note";
DROP TABLE "note";
ALTER TABLE "new_note" RENAME TO "note";
CREATE TABLE "new_task" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 0,
    "date_due" DATETIME,
    "date_completed" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "date_created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_updated" DATETIME NOT NULL,
    "workspace_id" INTEGER NOT NULL,
    "goal_id" INTEGER NOT NULL,
    CONSTRAINT "task_workspace_id_fkey" FOREIGN KEY ("workspace_id") REFERENCES "workspace" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "task_goal_id_fkey" FOREIGN KEY ("goal_id") REFERENCES "goal" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_task" ("content", "date_completed", "date_created", "date_due", "date_updated", "goal_id", "id", "name", "status", "workspace_id") SELECT "content", "date_completed", "date_created", "date_due", "date_updated", "goal_id", "id", "name", "status", "workspace_id" FROM "task";
DROP TABLE "task";
ALTER TABLE "new_task" RENAME TO "task";
CREATE TABLE "new_workspace" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "profile_id" INTEGER NOT NULL,
    CONSTRAINT "workspace_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profile" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_workspace" ("id", "name", "profile_id") SELECT "id", "name", "profile_id" FROM "workspace";
DROP TABLE "workspace";
ALTER TABLE "new_workspace" RENAME TO "workspace";
CREATE TABLE "new_goal" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 0,
    "date_from" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "date_to" DATETIME,
    "date_created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_updated" DATETIME NOT NULL,
    "workspace_id" INTEGER NOT NULL,
    CONSTRAINT "goal_workspace_id_fkey" FOREIGN KEY ("workspace_id") REFERENCES "workspace" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_goal" ("date_created", "date_from", "date_to", "date_updated", "description", "id", "name", "status", "workspace_id") SELECT "date_created", "date_from", "date_to", "date_updated", "description", "id", "name", "status", "workspace_id" FROM "goal";
DROP TABLE "goal";
ALTER TABLE "new_goal" RENAME TO "goal";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
