import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import "../pages/Product/product.css";
import Person2Icon from "@mui/icons-material/Person2";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { updateReply, deleteReply } from "../data/reply";

const Reply = ({ reply, loggedInUser, handleReplyUpdate }) => {
  const [editMode, setEditMode] = useState(false);
  const [editContent, setEditContent] = useState(reply.content);
  const handleEdit = () => setEditMode(true);
  const handleClose = () => setEditMode(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateReply(reply.id, editContent);
      handleReplyUpdate();
      handleClose();
    } catch (error) {
      console.error("Error updating the reply:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteReply(reply.id);
      handleReplyUpdate();
    } catch (error) {
      console.error("Error deleting the reply:", error);
    }
  };

  return (
    <div className="review-card">
      <div className="review-header">
        <div className="review-user-info">
          <div>
            <Person2Icon fontSize="large" />
          </div>

          <p className="review-username">{reply.user.username}</p>
          {loggedInUser?.email === reply.user.email ? (
            <span className="you-text">(You)</span>
          ) : (
            <div></div>
          )}
        </div>
        <div className="review-date">
          Replied on : {reply.date.substring(0, 10)}
        </div>
      </div>
      <div className="review-content">
        <p className="m-0">{reply.content}</p>
      </div>
      {loggedInUser?.email === reply.user.email && (
        <div className="review-actions">
          <Button variant="outline-success" size="sm" onClick={handleEdit}>
            <EditIcon />
          </Button>
          <Button variant="outline-danger" size="sm" onClick={handleDelete}>
            <DeleteIcon />
          </Button>
        </div>
      )}

      <Modal show={editMode} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Reply</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
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
    </div>
  );
};

export default Reply;
