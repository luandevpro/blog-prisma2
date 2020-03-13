# Migration `20200313075941`

This migration has been generated at 3/13/2020, 7:59:41 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql

```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200312210657..20200313075941
--- datamodel.dml
+++ datamodel.dml
@@ -1,49 +1,48 @@
-// This is your Prisma schema file,
-// learn more about it in the docs: https://pris.ly/d/prisma-schema
+generator client {
+  provider = "prisma-client-js"
+}
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url      = env("DATABASE_URL")
 }
-generator client {
-  provider = "prisma-client-js"
+model Category {
+  createdAt DateTime @default(now())
+  id        Int      @default(cuid()) @id
+  name      String   @default("")
+  updatedAt DateTime @default(now())
+  comment   Comment?
+  post      Post[]
 }
-model User {
-  id           Int       @id @default(autoincrement())
-  email        String    @unique
-  displayName  String?
-  createdAt    DateTime  @default(now())
-  updatedAt    DateTime  @default(now())
-  posts        Post[]
-  comments     Comment[]
+model Comment {
+  content   String?
+  createdAt DateTime   @default(now())
+  id        Int        @default(cuid()) @id
+  updatedAt DateTime   @default(now())
+  post      Post
+  user      User
+  category  Category[]
 }
 model Post {
-  id           Int       @id @default(cuid())
-  title        String?
-  description  String?
-  createdAt    DateTime  @default(now())
-  updatedAt    DateTime  @default(now())
-  user         User
-  comments     Comment[] 
-}
-
-model Comment {
-  id          Int         @id @default(cuid())
-  content     String?
-  createdAt   DateTime    @default(now())
-  updatedAt   DateTime    @default(now())
+  createdAt   DateTime  @default(now())
+  description String?
+  id          Int       @default(cuid()) @id
+  title       String?
+  updatedAt   DateTime  @default(now())
+  category    Category?
   user        User
-  post        Post
-  categories  Category[]
+  comment     Comment[]
 }
-model Category {
-  id          Int         @id @default(cuid())
-  name        String     
-  createdAt   DateTime    @default(now())
-  updatedAt   DateTime    @default(now())
-  posts       Post[]
+model User {
+  createdAt   DateTime  @default(now())
+  displayName String?
+  email       String    @default("") @unique
+  id          Int       @default(autoincrement()) @id
+  updatedAt   DateTime  @default(now())
+  comment     Comment[]
+  post        Post[]
 }
```


