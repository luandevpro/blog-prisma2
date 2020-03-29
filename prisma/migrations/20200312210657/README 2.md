# Migration `20200312210657`

This migration has been generated at 3/12/2020, 9:06:57 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."User" (
    "createdAt" timestamp(3)  NOT NULL DEFAULT '1970-01-01 00:00:00',
    "displayName" text   ,
    "email" text  NOT NULL DEFAULT '',
    "id" SERIAL,
    "updatedAt" timestamp(3)  NOT NULL DEFAULT '1970-01-01 00:00:00',
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."Post" (
    "category" integer   ,
    "createdAt" timestamp(3)  NOT NULL DEFAULT '1970-01-01 00:00:00',
    "description" text   ,
    "id" integer  NOT NULL ,
    "title" text   ,
    "updatedAt" timestamp(3)  NOT NULL DEFAULT '1970-01-01 00:00:00',
    "user" integer  NOT NULL ,
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."Comment" (
    "content" text   ,
    "createdAt" timestamp(3)  NOT NULL DEFAULT '1970-01-01 00:00:00',
    "id" integer  NOT NULL ,
    "post" integer  NOT NULL ,
    "updatedAt" timestamp(3)  NOT NULL DEFAULT '1970-01-01 00:00:00',
    "user" integer  NOT NULL ,
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."Category" (
    "comment" integer   ,
    "createdAt" timestamp(3)  NOT NULL DEFAULT '1970-01-01 00:00:00',
    "id" integer  NOT NULL ,
    "name" text  NOT NULL DEFAULT '',
    "updatedAt" timestamp(3)  NOT NULL DEFAULT '1970-01-01 00:00:00',
    PRIMARY KEY ("id")
) 

CREATE UNIQUE INDEX "User.email" ON "public"."User"("email")

ALTER TABLE "public"."Post" ADD FOREIGN KEY ("user")REFERENCES "public"."User"("id") ON DELETE RESTRICT  ON UPDATE CASCADE

ALTER TABLE "public"."Post" ADD FOREIGN KEY ("category")REFERENCES "public"."Category"("id") ON DELETE SET NULL  ON UPDATE CASCADE

ALTER TABLE "public"."Comment" ADD FOREIGN KEY ("user")REFERENCES "public"."User"("id") ON DELETE RESTRICT  ON UPDATE CASCADE

ALTER TABLE "public"."Comment" ADD FOREIGN KEY ("post")REFERENCES "public"."Post"("id") ON DELETE RESTRICT  ON UPDATE CASCADE

ALTER TABLE "public"."Category" ADD FOREIGN KEY ("comment")REFERENCES "public"."Comment"("id") ON DELETE SET NULL  ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200312210657
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,49 @@
+// This is your Prisma schema file,
+// learn more about it in the docs: https://pris.ly/d/prisma-schema
+
+datasource db {
+  provider = "postgresql"
+  url      = env("DATABASE_URL")
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+model User {
+  id           Int       @id @default(autoincrement())
+  email        String    @unique
+  displayName  String?
+  createdAt    DateTime  @default(now())
+  updatedAt    DateTime  @default(now())
+  posts        Post[]
+  comments     Comment[]
+}
+
+model Post {
+  id           Int       @id @default(cuid())
+  title        String?
+  description  String?
+  createdAt    DateTime  @default(now())
+  updatedAt    DateTime  @default(now())
+  user         User
+  comments     Comment[] 
+}
+
+model Comment {
+  id          Int         @id @default(cuid())
+  content     String?
+  createdAt   DateTime    @default(now())
+  updatedAt   DateTime    @default(now())
+  user        User
+  post        Post
+  categories  Category[]
+}
+
+model Category {
+  id          Int         @id @default(cuid())
+  name        String     
+  createdAt   DateTime    @default(now())
+  updatedAt   DateTime    @default(now())
+  posts       Post[]
+}
```


