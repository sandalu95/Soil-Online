import React from "react";

// Component to display total nutrients in three meals provided for a day
const Nutrients = ({ nutrients }) => {
  return (
    <div className="nutrients">
      <p>
        <span style={{ fontSize: "30px" }}>{nutrients?.calories}</span> kCal
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "28%",
        }}
      >
        <p>
          <span
            style={{
              height: 8,
              width: 8,
              borderRadius: "50%",
              backgroundColor: "#FFBE61",
              margin: "0 5px",
              display: "inline-block",
            }}
          />
          Protein
        </p>
        <p>{nutrients?.protein}g</p>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "28%",
        }}
      >
        <p>
          <span
            style={{
              height: 8,
              width: 8,
              borderRadius: "50%",
              backgroundColor: "#F14647",
              margin: "0 5px",
              display: "inline-block",
            }}
          />
          Fat
        </p>
        <p> {nutrients?.fat}g</p>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "28%",
        }}
      >
        <p>
          <span
            style={{
              height: 8,
              width: 8,
              borderRadius: "50%",
              backgroundColor: "#7ACA25",
              margin: "0 5px",
              display: "inline-block",
            }}
          />
          Carbohydrates
        </p>
        <p> {nutrients?.carbohydrates}g</p>
      </div>
    </div>
  );
};

export default Nutrients;
