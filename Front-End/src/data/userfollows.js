import axios from "axios";

const API_HOST = "http://localhost:4000";

async function getFollowingUsers(followerEmail) {
  try {
    const response = await axios.get(
      `${API_HOST}/api/userfollows/${followerEmail}`
    );
    return response.data;
  } catch (error) {
    console.error("Error checking follow status:", error);
    return [];
  }
}

async function followUser(followerEmail, followingEmail) {
  try {
    const response = await axios.post(`${API_HOST}/api/userfollows/follow`, {
      followerEmail,
      followingEmail,
    });
    return response.data;
  } catch (error) {
    console.error("Error following user:", error);
    return null;
  }
}

async function unfollowUser(followerEmail, followingEmail) {
  try {
    const response = await axios.post(`${API_HOST}/api/userfollows/unfollow`, {
      followerEmail,
      followingEmail,
    });
    return response.data;
  } catch (error) {
    console.error("Error unfollowing user:", error);
    return null;
  }
}

export { getFollowingUsers, followUser, unfollowUser };
