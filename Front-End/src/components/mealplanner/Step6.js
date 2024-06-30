import React from "react";
import { ToggleButton } from "react-bootstrap";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { AddCircleOutlineRounded } from "@mui/icons-material";
import { allergiesList } from "../../data/mealPlanner";

const Step6Allergies = ({ selectedAllergies, handleAllergyToggle }) => {
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
          marginBottom: "50px",
        }}
      >
        Do you have any allergies?
      </p>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          width: "70%",
          justifyContent: "center",
          marginInline: "auto",
          marginTop: "80px",
        }}
      >
        {allergiesList.map((allergy) => (
          <ToggleButton
            key={allergy}
            className="mb-4"
            id={`toggle-check-${allergy}`}
            type="checkbox"
            variant="outline-success"
            checked={selectedAllergies.includes(allergy)}
            value={allergy}
            onChange={() => handleAllergyToggle(allergy)}
            style={{
              marginRight: "20px",
              padding: "10px",
              paddingInline: "15px",
            }}
          >
            {selectedAllergies.includes(allergy) ? (
              <CheckCircleRoundedIcon />
            ) : (
              <AddCircleOutlineRounded />
            )}
            {allergy}
          </ToggleButton>
        ))}
      </div>
    </div>
  );
};

export default Step6Allergies;
