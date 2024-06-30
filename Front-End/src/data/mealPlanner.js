// API supported allery list
export const allergiesList = [
  "Peanuts",
  "Shellfish",
  "Dairy",
  "Gluten",
  "Soy",
  "Eggs",
  "Tree Nuts",
  "Fish",
];

// API supported diet list
export const dietList = [
  "No Diet",
  "Vegetarian",
  "Vegan",
  "Pescatarian",
  "Paleo",
  "Ketogenic",
  "Ovo Vegetarian",
  "Lacto Vegetarian",
  "Primal",
  "Whole 30",
];

function initHealthProfile() {
  // Stop if data is already initialised.
  if (localStorage.getItem("healthProfile") !== null) return;

  // User data is hard-coded, passwords are hashed and stored.
  const profile = {
    age: "",
    gender: "",
    weight: "",
    height: "",
    activityLevel: "sedentary",
    dietaryPreferences: "",
    healthGoals: "",
  };

  // Set data into local storage
  localStorage.setItem("healthProfile", JSON.stringify(profile));
}

export { initHealthProfile };
