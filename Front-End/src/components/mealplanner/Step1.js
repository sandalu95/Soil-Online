import React from "react";
import { Form } from "react-bootstrap";

const Step1UserProfile = ({
  userInput,
  handleInputChange,
  handleGenderRadioChange,
}) => {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        margin: "auto",
        padding: "20px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <p
        style={{
          fontFamily: "Arial, sans-serif",
          fontSize: "30px",
          fontWeight: "bold",
          color: "#426745",
          textAlign: "center",
          marginBottom: "18px",
        }}
      >
        Create your health profile
      </p>
      <Form
        style={{
          width: "50%",
          marginInline: "auto",
          marginTop: "30px",
        }}
      >
        <Form.Group className="mb-5">
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="number"
            name="age"
            value={userInput.age}
            onChange={handleInputChange}
            style={{ fontSize: "16px" }}
            size="lg"
          />
        </Form.Group>
        <Form.Group controlId="genderControl" className="mb-5">
          <Form.Label>Gender</Form.Label>
          <div style={{ display: "flex" }}>
            <Form.Check
              label="Male"
              name="gender"
              value="male"
              type="radio"
              id="gender-radio-1"
              checked={userInput.gender === "male"}
              onChange={handleGenderRadioChange}
              style={{ marginRight: "30px" }}
            />
            <Form.Check
              label="Female"
              name="gender"
              value="female"
              type="radio"
              id="gender-radio-2"
              checked={userInput.gender === "female"}
              onChange={handleGenderRadioChange}
            />
          </div>
        </Form.Group>
        <Form.Group className="mb-5">
          <Form.Label>Weight (kg)</Form.Label>
          <Form.Control
            type="number"
            name="weight"
            value={userInput.weight}
            onChange={handleInputChange}
            style={{ fontSize: "16px" }}
            size="lg"
          />
        </Form.Group>
        <Form.Group className="mb-5">
          <Form.Label>Height (cm)</Form.Label>
          <Form.Control
            type="number"
            name="height"
            value={userInput.height}
            onChange={handleInputChange}
            style={{ fontSize: "16px" }}
            size="lg"
          />
        </Form.Group>
      </Form>
    </div>
  );
};

export default Step1UserProfile;
