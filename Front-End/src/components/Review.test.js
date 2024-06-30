import { render, screen } from "@testing-library/react";
import Review from "./Review";
import { act } from "react-dom/test-utils";

// Mock the necessary data and functions
jest.mock("../data/reviews", () => {
  return { deleteReview: jest.fn(), updateReview: jest.fn() };
});

jest.mock("../data/reply", () => {
  return { getReplies: jest.fn() };
});

jest.mock("../data/userfollows", () => {
  return {
    getFollowingUsers: () => {
      return mockLoggedInUser.userfollows;
    },
    followUser: jest.fn(),
    unfollowUser: jest.fn(),
  };
});

const mockReview = {
  id: 1,
  user: { email: "user@example.com", username: "mia" },
  stars: 4,
  content: "This is a test review",
  date: "2024-05-26 03:49:51",
  product: { id: 1, name: "banana" },
};

const mockLoggedInUser = {
  email: "user@example.com",
  username: "mia",
  userfollows: [
    {
      id: 1,
      followerEmail: "user@example.com",
      followingEmail: "test@thing.com",
    },
    {
      id: 2,
      followerEmail: "user@example.com",
      followingEmail: "sandy@thing.com",
    },
  ],
};

const handleReviewUpdate = jest.fn();

test("Display review component correctly", async () => {
  await act(async () => {
    render(
      <Review
        review={mockReview}
        loggedInUser={mockLoggedInUser}
        handleReviewUpdate={handleReviewUpdate}
      />
    );
  });

  // Correctly display basic informations
  expect(screen.getByText("This is a test review")).toBeInTheDocument();
  expect(screen.getByText("mia")).toBeInTheDocument();
  expect(screen.getByText("Reviewed on : 2024-05-26")).toBeInTheDocument();

  // User can reply to their own review
  expect(screen.getByText("Reply")).toBeInTheDocument();

  // user cannot follow themselves, make sure display correct information
  expect(screen.queryByText("Follow")).not.toBeInTheDocument();
  expect(screen.queryByText("(You)")).toBeInTheDocument();

  // edit and delete button display for user's review
  screen.getByRole("button", {
    name: /edit/i,
  });
  screen.getByRole("button", {
    name: /delete/i,
  });
});
