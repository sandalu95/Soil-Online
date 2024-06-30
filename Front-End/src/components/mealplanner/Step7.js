import React from "react";
import { Form } from "react-bootstrap";

const Step7DietPreferences = ({ userInput, dietList, handleDietChange }) => {
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
          marginBottom: "30px",
        }}
      >
        Do you have any dietary preferences?
      </p>
      <Form
        style={{
          width: "60%",
          marginInline: "auto",
          marginTop: "40px",
          fontSize: "18px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <Form.Group
          controlId="dietPreference"
          style={{ display: "flex", flexWrap: "wrap" }}
        >
          {dietList.map((diet) => (
            <Form.Check
              key={diet}
              label={diet}
              name={diet}
              value={diet}
              type="radio"
              id={`checkbox-${diet}`}
              checked={userInput.diet === diet}
              onChange={handleDietChange}
              className="mb-4"
              style={{ width: "50%" }}
            />
          ))}
        </Form.Group>
      </Form>
    </div>
  );
};

export default Step7DietPreferences;
