import React from "react";
import { Form } from "react-bootstrap";

const activityOptions = [
  { label: "Sedentary (little or no exercise)", value: "sedentary" },
  {
    label: "Lightly active (light exercise/sports 1-3 days a week)",
    value: "lightlyActive",
  },
  {
    label: "Moderately active (moderate exercise/sports 3-5 days a week)",
    value: "moderatelyActive",
  },
  {
    label: "Very active (hard exercise/sports 6-7 days a week)",
    value: "veryActive",
  },
  {
    label: "Extra active (very hard exercise/physical job & exercise 2x a day)",
    value: "extraActive",
  },
];

const Step2ActivityLevel = ({ userInput, handleInputChange }) => {
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
        Select Your Activity Level
      </p>
      <Form
        style={{
          width: "50%",
          marginInline: "auto",
          marginTop: "30px",
        }}
      >
        <Form.Group controlId="activityLevel">
          {activityOptions.map((option, index) => (
            <Form.Check
              key={index}
              label={option.label}
              name="activityLevel"
              value={option.value}
              type="radio"
              checked={userInput.activityLevel === option.value}
              onChange={handleInputChange}
              style={{ marginBottom: "15px" }}
            />
          ))}
        </Form.Group>
      </Form>
    </div>
  );
};

export default Step2ActivityLevel;
