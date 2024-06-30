const db = require("../database");

// Get all following user for a given user
exports.getFollowingUsers = async (req, res) => {
  const followerEmail = req.params.followerEmail;

  try {
    const user = await db.user.findOne({ where: { email: followerEmail } });
    if (user) {
      // Fetch user follows directly from the userfollows table
      const following = await db.userfollows.findAll({
        where: { followerEmail },
      });

      res.status(200).json(following);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching following users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Follow a user
exports.followUser = async (req, res) => {
  const { followerEmail, followingEmail } = req.body;

  // Backend validation
  if (followerEmail === followingEmail) {
    return res.status(400).json({ error: "You cannot follow yourself" });
  }

  // check if user already follows
  const relationship = await db.userfollows.findOne({
    where: { followerEmail, followingEmail },
  });

  if (relationship) {
    return res.status(400).json({ error: "You already followed this user" });
  }

  try {
    const follow = await db.userfollows.create({
      followerEmail,
      followingEmail,
    });

    res.status(201).json(follow);
  } catch (error) {
    console.error("Error following user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Unfollow a followed user
exports.unfollowUser = async (req, res) => {
  const { followerEmail, followingEmail } = req.body;

  try {
    const follow = await db.userfollows.findOne({
      where: { followerEmail, followingEmail },
    });

    if (!follow) {
      return res.status(404).json({ error: "Follow relationship not found" });
    }

    await follow.destroy();
    res.status(200).json({ message: "Unfollowed successfully" });
  } catch (error) {
    console.error("Error unfollowing user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
