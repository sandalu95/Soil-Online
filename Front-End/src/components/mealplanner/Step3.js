import React from "react";
import { Form } from "react-bootstrap";

const healthGoalOptions = [
  { label: "Weight Loss", value: "weightLoss" },
  { label: "Muscle Gain", value: "muscleGain" },
  { label: "Maintain Weight", value: "maintainWeight" },
];

const Step3HealthGoals = ({ userInput, handleInputChange }) => {
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
        Select Your Health Goal
      </p>
      <Form
        style={{
          width: "40%",
          marginInline: "auto",
          marginTop: "50px",
          fontSize: "18px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <Form.Group controlId="healthGoals">
          {healthGoalOptions.map((option, index) => (
            <Form.Check
              key={index}
              label={option.label}
              name="healthGoals"
              value={option.value}
              type="radio"
              checked={userInput.healthGoals === option.value}
              onChange={handleInputChange}
              className="mb-5 ml-5"
            />
          ))}
        </Form.Group>
      </Form>
    </div>
  );
};

export default Step3HealthGoals;
