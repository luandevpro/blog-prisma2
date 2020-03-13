const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createUser = async (req, res) => {
  const dataUser = {
    email: req.body.email,
    displayName: req.body.displayName,
  };

  const newUser = await prisma.user.create({
    data: dataUser,
  });
  res.json(newUser);
};

exports.getUser = async (req, res) => {
  const user = await prisma.user.findOne({
    where: { id: req.params.id },
  });
  res.json(user);
};

exports.getUsers = async (req, res) => {
  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    first: 3,
  });
  res.json({ data: users });
};

exports.deleteUser = async (req, res) => {
  const user = await prisma.user.findOne({ where: { id: req.params.id } });
  const deletePost = await prisma.post.deleteMany({
    where: {
      author: user,
    },
  });
  const deleteUser = await prisma.user.delete({
    where: { id: req.params.id },
    include: { post: true },
  });
  Promise.all([deletePost, deleteUser]).then((values) => {
    return res.json(values);
  });
};
