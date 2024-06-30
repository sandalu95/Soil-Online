const db = require("../database");

// Get reply for a given review
exports.getReviewReplies = async (req, res) => {
  try {
    const replies = await db.reply.findAll({
      where: { reviewId: req.params.reviewId },
      include: [
        {
          model: db.user,
          attributes: { exclude: ["passwordHash"] },
        },
      ],
    });
    res.json(replies);
  } catch (error) {
    res.status(500).send(`Unexpected error: ${error.message}`);
  }
};

// Create new reply
exports.createReply = async (req, res) => {
  try {
    const { reviewId, userEmail, content } = req.body;

    // Backend validation
    // Check if all required fields are provided
    if (!content) {
      return res.status(400).json({ error: "Please fill the required form" });
    }

    // Create new review
    const newReply = await db.reply.create({
      reviewId,
      userEmail,
      content,
      date: new Date().toLocaleString(),
    });
    res.status(201).json(newReply);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// Update reply
exports.updateReply = async (req, res) => {
  try {
    const { content } = req.body;
    const replyId = req.params.replyId;

    // Find the reply by ID
    const reply = await db.reply.findByPk(replyId);

    if (!reply) {
      return res.status(404).send("Reply not found");
    }

    // Update the reply
    reply.content = content;
    await reply.save();

    res.json(reply);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// Delete reply
exports.deleteReply = async (req, res) => {
  try {
    const replyId = req.params.replyId;

    // Find the reply by ID
    const reply = await db.reply.findByPk(replyId);

    if (!reply) {
      return res.status(404).send("Reply not found");
    }

    // Delete the reply
    await reply.destroy();

    res.status(204).send();
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
