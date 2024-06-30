const db = require("../../database");

const getReviews = async () => {
  return await db.review.findAll({
    include: [
      {
        model: db.user,
        attributes: { exclude: ["passwordHash"] },
      },
      {
        model: db.product,
      },
    ],
  });
};

const getFlaggedReviews = async () => {
  return await db.review.findAll({
    where: { isFlagged: true },
    include: [
      {
        model: db.user,
        attributes: { exclude: ["passwordHash"] },
      },
      {
        model: db.product,
      },
    ],
  });
};

const getReviewById = async (id) => {
  return await db.review.findByPk(id, {
    include: [
      {
        model: db.user,
        attributes: { exclude: ["passwordHash"] },
      },
      {
        model: db.product,
      },
    ],
  });
};

const deleteReview = async (id) => {
  const review = await db.review.findByPk(id);
  if (!review) {
    throw new Error("Review not found");
  }
  await review.destroy();
  return true;
};

const setAdminDeleted = async (id) => {
  const review = await db.review.findByPk(id);
  if (!review) {
    throw new Error("Review not found");
  }
  review.isAdminDeleted = true;
  review.isFlagged = false;
  await review.save();
  return true;
};

const setFlagged = async (id) => {
  const review = await db.review.findByPk(id);
  if (!review) {
    throw new Error("Review not found");
  }
  review.isFlagged = false;
  await review.save();
  return true;
};

module.exports = {
  getReviews,
  deleteReview,
  getFlaggedReviews,
  setAdminDeleted,
  setFlagged,
  getReviewById,
};
