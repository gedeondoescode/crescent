-- CreateTable
CREATE TABLE "profile" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "date_created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_updated" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "workspace" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "profile_id" INTEGER,
    CONSTRAINT "workspace_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profile" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "note" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "date_created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_updated" DATETIME NOT NULL,
    "workspace_id" INTEGER,
    CONSTRAINT "note_workspace_id_fkey" FOREIGN KEY ("workspace_id") REFERENCES "workspace" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "task" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "content" TEXT,
    "status" INTEGER NOT NULL DEFAULT 0,
    "date_due" DATETIME,
    "date_completed" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "date_created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_updated" DATETIME NOT NULL,
    "workspace_id" INTEGER,
    "goal_id" INTEGER,
    CONSTRAINT "task_workspace_id_fkey" FOREIGN KEY ("workspace_id") REFERENCES "workspace" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "task_goal_id_fkey" FOREIGN KEY ("goal_id") REFERENCES "goal" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "goal" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 0,
    "date_from" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "date_to" DATETIME,
    "date_created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_updated" DATETIME NOT NULL,
    "workspace_id" INTEGER,
    CONSTRAINT "goal_workspace_id_fkey" FOREIGN KEY ("workspace_id") REFERENCES "workspace" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "tag" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "color" TEXT,
    "date_created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_updated" DATETIME NOT NULL,
    "num_objects" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "tag_objects" (
    "date_created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tags_id" INTEGER NOT NULL,
    "notes_id" INTEGER NOT NULL,

    PRIMARY KEY ("tags_id", "notes_id"),
    CONSTRAINT "tag_objects_tags_id_fkey" FOREIGN KEY ("tags_id") REFERENCES "tag" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "tag_objects_notes_id_fkey" FOREIGN KEY ("notes_id") REFERENCES "note" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "label" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "date_created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_updated" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "label_on_workspace" (
    "label_id" INTEGER NOT NULL,
    "workspace_id" INTEGER NOT NULL,

    PRIMARY KEY ("label_id", "workspace_id"),
    CONSTRAINT "label_on_workspace_label_id_fkey" FOREIGN KEY ("label_id") REFERENCES "label" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT "label_on_workspace_workspace_id_fkey" FOREIGN KEY ("workspace_id") REFERENCES "workspace" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
);
