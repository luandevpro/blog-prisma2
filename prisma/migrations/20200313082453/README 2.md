# Migration `20200313082453`

This migration has been generated at 3/13/2020, 8:24:53 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
DROP TABLE "public"."Category","public"."Comment","public"."Post","public"."User","public"."_CategoryToPost";

CREATE TABLE "public"."Category" (
    "createdAt" timestamp(3)  NOT NULL DEFAULT '1970-01-01 00:00:00',
    "id" text  NOT NULL ,
    "name" text   ,
    "updatedAt" timestamp(3)  NOT NULL DEFAULT '1970-01-01 00:00:00',
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."Comment" (
    "content" text   ,
    "createdAt" timestamp(3)  NOT NULL DEFAULT '1970-01-01 00:00:00',
    "id" text  NOT NULL ,
    "post" text  NOT NULL ,
    "updatedAt" timestamp(3)  NOT NULL DEFAULT '1970-01-01 00:00:00',
    "user" text  NOT NULL ,
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."Post" (
    "createdAt" timestamp(3)  NOT NULL DEFAULT '1970-01-01 00:00:00',
    "description" text   ,
    "id" text  NOT NULL ,
    "title" text   ,
    "updatedAt" timestamp(3)  NOT NULL DEFAULT '1970-01-01 00:00:00',
    "user" text  NOT NULL ,
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."User" (
    "createdAt" timestamp(3)  NOT NULL DEFAULT '1970-01-01 00:00:00',
    "displayName" text   ,
    "email" text  NOT NULL DEFAULT '',
    "id" text  NOT NULL ,
    "updatedAt" timestamp(3)  NOT NULL DEFAULT '1970-01-01 00:00:00',
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."_CategoryToPost" (
    "A" text  NOT NULL ,
    "B" text  NOT NULL 
) 

CREATE UNIQUE INDEX "User.email" ON "public"."User"("email")

CREATE UNIQUE INDEX "_CategoryToPost_AB_unique" ON "public"."_CategoryToPost"("A","B")

ALTER TABLE "public"."Comment" ADD FOREIGN KEY ("post")REFERENCES "public"."Post"("id") ON DELETE RESTRICT  ON UPDATE CASCADE

ALTER TABLE "public"."Comment" ADD FOREIGN KEY ("user")REFERENCES "public"."User"("id") ON DELETE RESTRICT  ON UPDATE CASCADE

ALTER TABLE "public"."Post" ADD FOREIGN KEY ("user")REFERENCES "public"."User"("id") ON DELETE RESTRICT  ON UPDATE CASCADE

ALTER TABLE "public"."_CategoryToPost" ADD FOREIGN KEY ("A")REFERENCES "public"."Category"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."_CategoryToPost" ADD FOREIGN KEY ("B")REFERENCES "public"."Post"("id") ON DELETE CASCADE  ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200313080309..20200313082453
--- datamodel.dml
+++ datamodel.dml
@@ -3,34 +3,34 @@
 }
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url      = env("DATABASE_URL")
 }
 model Category {
   createdAt DateTime @default(now())
-  id        Int      @default(cuid()) @id
-  name      String   @default("")
-  updatedAt DateTime @default(now())
+  id        String   @default(cuid()) @id
+  name      String?
+  updatedAt DateTime @updatedAt
   posts     Post[]
 }
 model Comment {
   content   String?
   createdAt DateTime   @default(now())
-  id        Int        @default(cuid()) @id
-  updatedAt DateTime   @default(now())
+  id        String     @default(cuid()) @id
+  updatedAt DateTime   @updatedAt
   post      Post
   user      User
 }
 model Post {
   createdAt   DateTime  @default(now())
   description String?
-  id          Int       @default(cuid()) @id
+  id          String    @default(cuid()) @id
   title       String?
-  updatedAt   DateTime  @default(now())
+  updatedAt   DateTime  @updatedAt
   categories  Category[]
   user        User
   comments    Comment[]
 }
@@ -38,9 +38,9 @@
 model User {
   createdAt   DateTime  @default(now())
   displayName String?
   email       String    @default("") @unique
-  id          Int       @default(autoincrement()) @id
-  updatedAt   DateTime  @default(now())
+  id          String    @default(cuid()) @id
+  updatedAt   DateTime  @updatedAt
   comment     Comment[]
   post        Post[]
 }
```


