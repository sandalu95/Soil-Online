import React, { useState } from "react";
import { calculateCalories } from "../../utils/CalorieCalculator";
import axios from "axios";
import "./mealplan.css";
import { toast } from "react-toastify";
import Day from "../../components/mealplanner/Day";
import { dietList } from "../../data/mealPlanner";
import Navigation from "../../components/mealplanner/Navigation";
import Step0Introduction from "../../components/mealplanner/Step0";
import Step1UserProfile from "../../components/mealplanner/Step1";
import Step2ActivityLevel from "../../components/mealplanner/Step2";
import Step3HealthGoals from "../../components/mealplanner/Step3";
import Step4CalorieTarget from "../../components/mealplanner/Step4";
import Step5PlanType from "../../components/mealplanner/Step5";
import Step6Allergies from "../../components/mealplanner/Step6";
import Step7DietPreferences from "../../components/mealplanner/Step7";

const MealPlanning = () => {
  const [userInput, setUserInput] = useState({
    age: "",
    gender: "",
    weight: "",
    height: "",
    activityLevel: "sedentary",
    diet: "No Diet",
    healthGoals: "weightLoss",
  });
  const [generatedPlan, setGeneratedPlan] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [selectedAllergies, setSelectedAllergies] = useState([]);
  const [recomendedCalorie, setRecomendedCalorie] = useState();
  const [caloriIntake, setCaloriIntake] = useState("");
  const [planType, setPlanType] = useState("day");

  // Handle all input fields in the user profile section
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Function to call the API and get the diet plan
  const generateDietPlan = () => {
    const dailyCalories = caloriIntake || recomendedCalorie;
    const dietPreference = userInput?.diet === "No Diet" ? "" : userInput?.diet;

    const spoonUrl = `https://api.spoonacular.com/mealplanner/generate?apiKey=b147d97b89cb4cd58f0a9abeda5bd32f&timeFrame=${planType}&targetCalories=${dailyCalories}&diet=${dietPreference}&exclude=${selectedAllergies.toString()}`;

    axios
      .get(spoonUrl)
      .then((response) => {
        setGeneratedPlan(response.data);
      })
      .catch((error) => {
        toast.error("Failed to fetch meal plan. Please try again later.");
      });
  };

  // Handle gender selection
  const handleGenderRadioChange = (e) => {
    e.persist();

    setUserInput((prevState) => ({
      ...prevState,
      gender: e.target.value,
    }));
  };

  // Handle Allergy inputs
  const handleAllergyToggle = (allergy) => {
    const newSelectedAllergies = selectedAllergies.includes(allergy)
      ? selectedAllergies.filter((a) => a !== allergy)
      : [...selectedAllergies, allergy];
    setSelectedAllergies(newSelectedAllergies);
  };

  // Handle Dietery restrictions
  const handleDietChange = (e) => {
    e.persist();

    setUserInput((prevState) => ({
      ...prevState,
      diet: e.target.value,
    }));
  };

  // Handle Diet plan type
  const handlePlanChange = (e) => {
    e.persist();

    setPlanType(e.target.value);
  };

  // Handle Next Buttton click in lower navigation
  const handleNext = () => {
    if (activeStep + 1 === 4) {
      // Calculate daily calorie requirements using user input
      const { age, gender, weight, height, activityLevel, healthGoals } =
        userInput;
      const dailyCalories = calculateCalories(
        age,
        weight,
        height,
        gender,
        activityLevel,
        healthGoals
      );

      setRecomendedCalorie(Math.round(dailyCalories));
    }
    if (activeStep + 1 === 8) {
      generateDietPlan();
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  // Handle Back Buttton click in lower navigation
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // Render the dots in the lower navigation
  const renderDots = () => {
    const dots = [];
    for (let i = 0; i < 9; i++) {
      dots.push(
        <span
          key={i}
          style={{
            height: 10,
            width: 10,
            borderRadius: "50%",
            backgroundColor: i === activeStep ? "darkGreen" : "lightgray",
            margin: "0 5px",
            display: "inline-block",
            cursor: "pointer",
          }}
          onClick={() => setActiveStep(i)}
        />
      );
    }
    return dots;
  };

  return (
    <div className="container d-flex justify-content-center">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "70%",
          marginBottom: "20px",
        }}
      >
        {/* Body section */}
        <div
          style={{
            overflowY: "auto",
            borderRadius: "10px",
            backgroundColor: "#f8f9fa",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            padding: 30,
            marginBottom: 20,
            width: "100%",
            height: "680px",
          }}
        >
          {activeStep === 0 && <Step0Introduction handleNext={handleNext} />}
          {activeStep === 1 && (
            <Step1UserProfile
              userInput={userInput}
              handleInputChange={handleInputChange}
              handleGenderRadioChange={handleGenderRadioChange}
            />
          )}
          {activeStep === 2 && (
            <Step2ActivityLevel
              userInput={userInput}
              handleInputChange={handleInputChange}
            />
          )}
          {activeStep === 3 && (
            <Step3HealthGoals
              userInput={userInput}
              handleInputChange={handleInputChange}
            />
          )}
          {activeStep === 4 && (
            <Step4CalorieTarget
              recomendedCalorie={recomendedCalorie}
              caloriIntake={caloriIntake}
              setCaloriIntake={setCaloriIntake}
            />
          )}
          {activeStep === 5 && (
            <Step5PlanType
              planType={planType}
              handlePlanChange={handlePlanChange}
            />
          )}
          {activeStep === 6 && (
            <Step6Allergies
              selectedAllergies={selectedAllergies}
              handleAllergyToggle={handleAllergyToggle}
            />
          )}
          {activeStep === 7 && (
            <Step7DietPreferences
              userInput={userInput}
              dietList={dietList}
              handleDietChange={handleDietChange}
            />
          )}
          {activeStep === 8 && (
            <div>
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
                Congratulations! Your personalized meal plan is ready.
              </p>

              {/* Weekly plan */}
              {generatedPlan && planType === "week" && (
                <div className="meal-plan">
                  {console.log("week", generatedPlan.week)}
                  {generatedPlan.week &&
                    Object.keys(generatedPlan.week).map((day, index) => (
                      <Day
                        key={index}
                        day={day}
                        meals={generatedPlan.week[day].meals}
                        nutrients={generatedPlan.week[day].nutrients}
                      />
                    ))}
                </div>
              )}

              {/* Daily plan */}
              {generatedPlan && planType === "day" && (
                <div className="meal-plan">
                  <Day
                    meals={generatedPlan.meals}
                    nutrients={generatedPlan.nutrients}
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Lower navigation section */}
        <Navigation
          activeStep={activeStep}
          handleBack={handleBack}
          handleNext={handleNext}
          renderDots={renderDots}
        />
      </div>
    </div>
  );
};

export default MealPlanning;
