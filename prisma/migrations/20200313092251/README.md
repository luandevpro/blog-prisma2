# Migration `20200313092251`

This migration has been generated at 3/13/2020, 9:22:51 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."CategoryToPost" (
    "category" text  NOT NULL ,
    "id" text  NOT NULL ,
    "post" text  NOT NULL ,
    PRIMARY KEY ("id")
) 

ALTER TABLE "public"."CategoryToPost" ADD FOREIGN KEY ("category")REFERENCES "public"."Category"("id") ON DELETE RESTRICT  ON UPDATE CASCADE

ALTER TABLE "public"."CategoryToPost" ADD FOREIGN KEY ("post")REFERENCES "public"."Post"("id") ON DELETE RESTRICT  ON UPDATE CASCADE

DROP TABLE "public"."_CategoryToPost";
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200313082453..20200313092251
--- datamodel.dml
+++ datamodel.dml
@@ -3,44 +3,50 @@
 }
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url      = env("DATABASE_URL")
 }
 model Category {
   createdAt DateTime @default(now())
-  id        String   @default(cuid()) @id
+  id        String   @id @default(cuid())
   name      String?
   updatedAt DateTime @updatedAt
-  posts     Post[]
+  posts     CategoryToPost[]
 }
 model Comment {
   content   String?
   createdAt DateTime   @default(now())
-  id        String     @default(cuid()) @id
+  id        String     @id @default(cuid())  
   updatedAt DateTime   @updatedAt
   post      Post
   user      User
 }
 model Post {
   createdAt   DateTime  @default(now())
   description String?
-  id          String    @default(cuid()) @id
+  id          String    @id @default(cuid()) 
   title       String?
   updatedAt   DateTime  @updatedAt
-  categories  Category[]
+  categories  CategoryToPost[]
   user        User
   comments    Comment[]
 }
 model User {
   createdAt   DateTime  @default(now())
   displayName String?
   email       String    @default("") @unique
-  id          String    @default(cuid()) @id
+  id          String    @id @default(cuid()) 
   updatedAt   DateTime  @updatedAt
   comment     Comment[]
   post        Post[]
+}
+
+model CategoryToPost {
+  id       String   @id @default(cuid())
+  post     Post
+  category Category
 }
```


