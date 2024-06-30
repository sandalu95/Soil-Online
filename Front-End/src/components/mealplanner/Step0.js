import React from "react";
import { Button } from "react-bootstrap";

const Step0Introduction = ({ handleNext }) => {
  return (
    <div
      className="d-flex flex-column justify-content-center"
      style={{ alignItems: "center", height: "100%" }}
    >
      <p
        style={{
          fontSize: "18px",
          textAlign: "center",
          fontFamily: "sans-serif",
          marginBottom: "10px",
        }}
      >
        Say goodbye 👋 to mealtime stress with tailored, delicious dishes.
      </p>
      <p
        style={{
          fontSize: "18px",
          textAlign: "center",
          fontFamily: "sans-serif",
          marginBottom: "20px",
        }}
      >
        Plan⏰, track📈, and enjoy😍 your meals hassle-free.{" "}
        <span style={{ fontWeight: "bold", color: "darkgreen" }}>
          Welcome to personalized meal planning!
        </span>
      </p>
      <Button
        className="btn-custom"
        style={{ width: "30%", marginInline: "auto" }}
        onClick={handleNext}
      >
        Get Started !
      </Button>
    </div>
  );
};

export default Step0Introduction;
