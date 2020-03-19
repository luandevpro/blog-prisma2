const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createCategory = async (req, res) => {
  const category = await prisma.categoryToPost.create({
    data: {
      post: {
        connect: {
          id: req.body.postId,
        },
      },
      category: {
        create: {
          name: req.body.name,
        },
      },
    },
  });

  res.json(category);
};
