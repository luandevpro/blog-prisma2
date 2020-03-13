# Migration `20200313080309`

This migration has been generated at 3/13/2020, 8:03:09 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."_CategoryToPost" (
    "A" integer  NOT NULL ,
    "B" integer  NOT NULL 
) 

ALTER TABLE "public"."Category" DROP CONSTRAINT IF EXiSTS "Category_comment_fkey",
DROP COLUMN "comment";

ALTER TABLE "public"."Post" DROP CONSTRAINT IF EXiSTS "Post_category_fkey",
DROP COLUMN "category";

CREATE UNIQUE INDEX "_CategoryToPost_AB_unique" ON "public"."_CategoryToPost"("A","B")

ALTER TABLE "public"."_CategoryToPost" ADD FOREIGN KEY ("A")REFERENCES "public"."Category"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."_CategoryToPost" ADD FOREIGN KEY ("B")REFERENCES "public"."Post"("id") ON DELETE CASCADE  ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200313075941..20200313080309
--- datamodel.dml
+++ datamodel.dml
@@ -3,18 +3,17 @@
 }
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url      = env("DATABASE_URL")
 }
 model Category {
   createdAt DateTime @default(now())
   id        Int      @default(cuid()) @id
   name      String   @default("")
   updatedAt DateTime @default(now())
-  comment   Comment?
-  post      Post[]
+  posts     Post[]
 }
 model Comment {
   content   String?
@@ -22,20 +21,19 @@
   id        Int        @default(cuid()) @id
   updatedAt DateTime   @default(now())
   post      Post
   user      User
-  category  Category[]
 }
 model Post {
   createdAt   DateTime  @default(now())
   description String?
   id          Int       @default(cuid()) @id
   title       String?
   updatedAt   DateTime  @default(now())
-  category    Category?
+  categories  Category[]
   user        User
-  comment     Comment[]
+  comments    Comment[]
 }
 model User {
   createdAt   DateTime  @default(now())
```


