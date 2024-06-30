import React, { useState, useEffect } from "react";
import { Button, Form, Modal, Row, Col } from "react-bootstrap";
import Person2Icon from "@mui/icons-material/Person2";
import StarIcon from "@mui/icons-material/Star";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import "../pages/Product/product.css";
import { deleteReview, updateReview } from "../data/reviews";
import { getReplies } from "../data/reply";
import {
  getFollowingUsers,
  followUser,
  unfollowUser,
} from "../data/userfollows";
import StarRating from "./StarRating";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Reply from "./Reply";
import ReplyIcon from "@mui/icons-material/Reply";
import AddReplyForm from "./AddReplyForm";

const Review = ({ review, loggedInUser, handleReviewUpdate }) => {
  const [editMode, setEditMode] = useState(false);
  const [editRating, setEditRating] = useState(review.stars);
  const [editContent, setEditContent] = useState(review.content);
  const [isFollowingUser, setIsFollowingUser] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchFollowStatus = async () => {
      if (loggedInUser) {
        const followingUsers = await getFollowingUsers(loggedInUser.email);
        const isFollowing = followingUsers.some(
          (follow) => follow.followingEmail === review.user.email
        );
        setIsFollowingUser(isFollowing);
      }
    };

    fetchFollowStatus();
  }, [loggedInUser, review.user.email]);

  const [allReplies, setAllReplies] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isReplySubmitted, setIsReplySubmitted] = useState(false);

  // get all replies for current review from db
  useEffect(() => {
    async function loadReplies() {
      const replies = await getReplies(review?.id);
      setAllReplies(replies);
    }
    loadReplies();
  }, [review.id, isReplySubmitted]);

  const handleEdit = () => setEditMode(true);
  const handleClose = () => setEditMode(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateReview(review.id, editContent, editRating);
      handleReviewUpdate();
      handleClose();
    } catch (error) {
      console.error("Error updating the review:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteReview(review.id);
      handleReviewUpdate();
    } catch (error) {
      console.error("Error deleting the review:", error);
    }
  };

  // handle function for reply
  const handleReplySubmit = (isSubmitted) => {
    setIsReplySubmitted(isSubmitted);
  };

  const handleReplyUpdate = async () => {
    if (review) {
      const replies = await getReplies(review.id);
      setAllReplies(replies);
    }
  };

  const handleReplyForm = (visibility) => {
    setIsVisible(visibility);
  };

  const handleFollowToggle = async () => {
    if (!loggedInUser) {
      setErrorMessage("Please log in first.");
      return;
    }

    setLoading(true);
    setErrorMessage("");
    try {
      if (isFollowingUser) {
        await unfollowUser(loggedInUser.email, review.user.email);
      } else {
        await followUser(loggedInUser.email, review.user.email);
      }
      setIsFollowingUser(!isFollowingUser);
      setLoading(false);
    } catch (error) {
      console.error("Error toggling follow status:", error);
      setErrorMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="review-card">
      <div className="review-header">
        <div className="review-user-info">
          <div>
            <Person2Icon fontSize="large" />
          </div>

          <p className="review-username">{review.user.username}</p>

          {loggedInUser?.email !== review.user.email ? (
            <>
              <Button
                variant={isFollowingUser ? "outline-danger" : "outline-success"}
                size="sm"
                className="review-follow-btn"
                onClick={handleFollowToggle}
                disabled={loading}
              >
                {isFollowingUser ? "Unfollow" : "Follow"}{" "}
                {isFollowingUser ? <PersonRemoveIcon /> : <PersonAddAlt1Icon />}
              </Button>
            </>
          ) : (
            <span className="you-text">(You)</span>
          )}
          <Button
            variant="outline-success"
            size="sm"
            className="review-follow-btn"
            onClick={() => setIsVisible(true)}
            disabled={isVisible}
          >
            Reply <ReplyIcon />
          </Button>
        </div>
        <div className="review-date">
          Reviewed on : {review.date.substring(0, 10)}
        </div>
      </div>
      {errorMessage && (
        <p className="login-warning mt-1 mb-4 ml-1">{errorMessage}</p>
      )}
      <div className="review-rating">
        {[...Array(review.stars)].map((_, index) => (
          <StarIcon key={index} className="colored-star-icon" />
        ))}
        {[...Array(5 - review.stars)].map((_, index) => (
          <StarOutlineIcon key={index} style={{ color: "#e0e0e0" }} />
        ))}
      </div>
      <div className="review-content">
        {review.isAdminDeleted ? (
          <p className="admin-deleted-msg">
            **** This review has been deleted by the admin ***
          </p>
        ) : (
          <p className="m-0">{review.content}</p>
        )}
      </div>
      {loggedInUser?.email === review.user.email && (
        <div className="review-actions">
          <Button
            variant="outline-success"
            aria-label="edit"
            size="sm"
            onClick={handleEdit}
          >
            <EditIcon />
          </Button>
          <Button
            variant="outline-danger"
            aria-label="delete"
            size="sm"
            onClick={handleDelete}
          >
            <DeleteIcon />
          </Button>
        </div>
      )}

      <Row>
        {isVisible && loggedInUser ? (
          <Col>
            <AddReplyForm
              formVisible={handleReplyForm}
              review={review}
              loggedInUser={loggedInUser}
              handleReplySubmit={handleReplySubmit}
            />
          </Col>
        ) : (
          isVisible && (
            <p className="login-warning mt-1 mb-4 ml-1">
              Please log in to write a reply
            </p>
          )
        )}
      </Row>

      <Modal show={editMode} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Rating</Form.Label>
              <StarRating rating={editRating} setRating={setEditRating} />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
              />
            </Form.Group>
            <Button variant="success" type="submit" className="mt-3">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Row>
        {allReplies?.map((reply) => (
          <div key={reply.id}>
            <Reply
              reply={reply}
              loggedInUser={loggedInUser}
              handleReplyUpdate={handleReplyUpdate}
            />
          </div>
        ))}
      </Row>
    </div>
  );
};

export default Review;
