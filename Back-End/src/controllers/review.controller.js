const db = require("../database");
const profanity = require('@2toad/profanity').profanity;
const pubsub = require("../pubsub");
const REVIEW_ADDED = "REVIEW_ADDED";

// Get reviews for a given product
exports.getProductReviews = async (req, res) => {
  try {
    const reviews = await db.review.findAll({
      where: { productId: req.params.productId },
      include: [
        {
          model: db.user,
          attributes: { exclude: ["passwordHash"] },
        },
      ],
    });
    res.json(reviews);
  } catch (error) {
    res.status(500).send(`Unexpected error: ${error.message}`);
  }
};

// Create new review
exports.createReview = async (req, res) => {
  try {
    const { productId, userEmail, feedback, rating } = req.body;

    // Todo: Param input validation

    // Check for profanity
    const isFlagged = profanity.exists(feedback);

    // Create new review
    const newReview = await db.review.create({
      productId: productId,
      userEmail: userEmail,
      content: feedback,
      stars: rating,
      date: new Date().toLocaleString(),
      isFlagged: isFlagged
    });

    // Publish the review creation for GraphQL subscription
    pubsub.publish(REVIEW_ADDED, { reviewAdded: newReview });

    res.status(201).json(newReview);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// Update review
exports.updateReview = async (req, res) => {
  try {
    const { feedback, rating } = req.body;
    const reviewId = req.params.reviewId;

    // Find the review by ID
    const review = await db.review.findByPk(reviewId);

    if (!review) {
      return res.status(404).send("Review not found");
    }

    // Check for profanity
    const isFlagged = profanity.exists(feedback);

    // Update the review
    review.content = feedback;
    review.stars = rating;
    review.isFlagged = isFlagged;
    await review.save();

    res.json(review);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// Delete review
exports.deleteReview = async (req, res) => {
  try {
    const reviewId = req.params.reviewId;

    // Find the review by ID
    const review = await db.review.findByPk(reviewId);

    if (!review) {
      return res.status(404).send("Review not found");
    }

    // Delete the review
    await review.destroy();

    res.status(204).send(); // No content
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
