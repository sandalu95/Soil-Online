import React from "react";
import "../../pages/Meal Planning/mealplan.css";

// Component to display a single meal in a day
const Meal = ({ meal, mealName }) => {
  return (
    <>
      <h4 style={{ color: "#34495e" }}>{mealName}</h4>
      <div className="meal" style={{ height: "90%" }}>
        <img
          src={`https://spoonacular.com/recipeImages/${meal?.id}-556x370.${meal?.imageType}`}
          alt={meal?.title}
        />
        <h5 style={{ fontWeight: "bold", marginTop: "10px" }}>{meal?.title}</h5>
        <p
          className="m-0 mt-2"
          style={{ color: "darkgray", fontWeight: "normal" }}
        >
          Ready in {meal?.readyInMinutes} minutes
        </p>
        <p
          className="m-0 mb-3"
          style={{ color: "darkgray", fontWeight: "normal" }}
        >
          {meal?.servings} Servings
        </p>
        <a href={meal?.sourceUrl} target="_blank" rel="noopener noreferrer">
          View Recipe
        </a>
      </div>
    </>
  );
};

export default Meal;
