import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import StarRating from "./StarRating";
import "../pages/Product/product.css";
import { createReview } from "../data/reviews";
import { toast } from "react-toastify";

const AddReviewForm = ({
  formVisible,
  product,
  loggedInUser,
  handleReviewSubmit,
}) => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [warning, setWarning] = useState("");

  const handleFeedbackChange = (e) => {
    const words = e.target.value.trim().split(/\s+/);
    const wordCount = words.length;

    if (wordCount <= 100) {
      setFeedback(e.target.value);
      setWordCount(wordCount);
      setWarning("");
    } else {
      setWarning("Feedback cannot exceed 100 words.");
    }
  };

  const handleSubmit = async () => {
    formVisible(false);
    const response = await createReview(
      product?.id,
      loggedInUser?.email,
      feedback,
      rating
    );
    if (response) {
      handleReviewSubmit(true);
    } else {
      toast.error("Something wrong happened while writing the review.");
    }
  };

  return (
    <Form className="review-card">
      <Form.Group>
        <Form.Label>What would you rate this product?</Form.Label>
        <StarRating rating={rating} setRating={setRating} />
      </Form.Group>
      <Form.Group className="mt-3">
        <Form.Label>Tell us your feedback about the product</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={feedback}
          onChange={handleFeedbackChange}
        />
        <div className="word-count">{wordCount} / 100 words</div>
        {warning && <div className="warning">{warning}</div>}
      </Form.Group>
      <div className="d-flex my-4">
        <div className="form-button-container">
          <Button
            variant="outline-secondary"
            onClick={() => formVisible(false)}
          >
            Cancel
          </Button>
          <Button variant="success" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default AddReviewForm;
