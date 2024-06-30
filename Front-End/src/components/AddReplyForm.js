import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "../pages/Product/product.css";
import { createReply } from "../data/reply";
import { toast } from "react-toastify";

const AddReplyForm = ({
  formVisible,
  review,
  loggedInUser,
  handleReplySubmit,
}) => {
  const [content, setContent] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [warning, setWarning] = useState("");

  // handle reply content change
  const handleContentChange = (e) => {
    const words = e.target.value.trim().split(/\s+/);
    const wordCount = words.length;

    if (wordCount <= 100) {
      setContent(e.target.value);
      setWordCount(wordCount);
      setWarning("");
    } else {
      setWarning("Content cannot exceed 100 words.");
    }
  };

  const handleSubmit = async () => {
    formVisible(false);
    const response = await createReply(
      review?.id,
      loggedInUser?.email,
      content
    );
    if (response) {
      handleReplySubmit(true);
    } else {
      toast.error("Something wrong happened while writing the reply.");
    }
  };

  return (
    <Form className="review-card">
      <Form.Group className="mt-3">
        <Form.Label>Write your reply here:</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={content}
          onChange={handleContentChange}
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

export default AddReplyForm;
