import React from "react";
import { Form } from "react-bootstrap";

const Step4CalorieTarget = ({
  recomendedCalorie,
  caloriIntake,
  setCaloriIntake,
}) => (
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
      What is the caloric target for one day?
    </p>

    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "40%",
        margin: "auto",
        marginTop: "30px",
      }}
    >
      <h5 className="my-3">Your recommended calorie intake:</h5>
      <p
        style={{
          fontWeight: "bold",
          color: "darkgreen",
          fontSize: "25px",
          marginBottom: "50px",
        }}
      >
        {recomendedCalorie} kCal
      </p>

      <h5>Do you want to choose your own?</h5>
      <Form.Control
        name="custom-calories"
        type="number"
        value={caloriIntake}
        onChange={(e) => setCaloriIntake(e.target.value)}
        size="lg"
        style={{ width: "200px", marginTop: "15px", height: "40px" }}
      />
    </div>
  </div>
);

export default Step4CalorieTarget;
