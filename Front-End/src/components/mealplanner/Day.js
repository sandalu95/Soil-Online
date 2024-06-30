import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import Meal from "./Meal";
import "../../pages/Meal Planning/mealplan.css";
import Nutrients from "./Nutrients";

// Component to display a day in the meal plan.
const Day = ({ day, meals, nutrients }) => {
  const mealNames = ["Breakfast", "Lunch", "Dinner"];

  return (
    <div className="day">
      <Card
        className="py-3 px-4"
        style={{ fontFamily: "sans-serif", fontWeight: "bold" }}
      >
        {/* Appears only for weekly plan */}
        {day && (
          <>
            <p
              className="mt-2 mb-1"
              style={{ color: "darkgreen", fontSize: "30px" }}
            >
              {day.toString().toUpperCase()}
            </p>
            <hr style={{ marginBottom: "40px" }} />
          </>
        )}

        {/* Appears for both daily/weekly plans */}
        <Row className="meals">
          {meals?.map((meal, index) => (
            <Col key={index}>
              <Meal meal={meal} mealName={mealNames[index]} />
            </Col>
          ))}
        </Row>

        {/* Load Nutrients */}
        <Nutrients nutrients={nutrients} />
      </Card>
    </div>
  );
};

export default Day;
