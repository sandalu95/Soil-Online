import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { followUser, unfollowUser } from "../data/repository";

const FollowButton = ({ user, isFollowing, onFollowChange }) => {
  const [loading, setLoading] = useState(false);

  const handleFollow = async () => {
    setLoading(true);
    const result = isFollowing
      ? await unfollowUser(user.followerEmail, user.email)
      : await followUser(user.followerEmail, user.email);

    if (result) {
      onFollowChange(user.email, !isFollowing);
    }

    setLoading(false);
  };

  return (
    <Button onClick={handleFollow} disabled={loading}>
      {loading ? "Processing..." : isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
};

export default FollowButton;
