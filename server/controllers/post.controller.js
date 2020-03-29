const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createPost = async (req, res) => {
  const dataPost = {
    title: req.body.title,
    description: req.body.description,
    user: {
      connect: {
        id: req.body.userId,
      },
    },
  };
  const newPost = await prisma.post.create({
    data: dataPost,
    select: {
      id: true,
      title: true,
      description: false,
      user: {
        select: {
          id: true,
          email: true,
          displayName: true,
        },
      },
    },
  });
  res.json(newPost);
};

exports.getPost = async (req, res) => {
  const post = await prisma.post.findOne({
    where: { id: req.params.id },
    select: {
      id: true,
      title: true,
      description: false,
      user: {
        select: {
          id: true,
          email: true,
          displayName: true,
        },
      },
      categories: {
        select: {
          category: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
  res.json(post);
};

exports.getPosts = async (req, res) => {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    first: 5,
    select: {
      id: true,
      title: true,
      description: false,
      user: {
        select: {
          id: true,
          email: true,
          displayName: true,
        },
      },
    },
  });
  res.json(posts);
};

exports.deletePost = async (req, res) => {
  const post = await prisma.post.delete({
    where: { id: req.params.id },
    select: {
      id: true,
      title: true,
      description: false,
      user: {
        select: {
          id: true,
          email: true,
          displayName: true,
        },
      },
    },
  });
  res.json(post);
};

exports.updatePost = async (req, res) => {
  const post = await prisma.post.update({
    where: { id: req.params.id },
    data: {
      title: req.body.title,
      description: req.body.description,
    },
  });
  res.json(post);
};
