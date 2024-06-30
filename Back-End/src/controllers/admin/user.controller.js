const db = require("../../database");

const getUsers = async () => {
  return await db.user.findAll();
};

const blockUser = async (email) => {
  const user = await db.user.findByPk(email);
  user.isBlocked = true;
  await user.save();
  return user;
};

const unblockUser = async (email) => {
  const user = await db.user.findByPk(email);
  user.isBlocked = false;
  await user.save();
  return user;
};

module.exports = {
  getUsers,
  blockUser,
  unblockUser,
};
