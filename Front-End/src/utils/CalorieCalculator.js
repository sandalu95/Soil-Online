// Calculate the total calorie intake for a given age, weight, height, gender, activity, and goal
export const calculateCalories = (
  age,
  weight,
  height,
  gender,
  activityLevel,
  goal
) => {
  // Function to calculate the BMR using age, weight, height, and gender
  const calculateBMR = (age, weight, height, gender) => {
    let bmr
    if (gender === 'male') {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5
    } else if (gender === 'female') {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161
    }
    return bmr
  }

  // Function to adjust for Activity Level and calculate Total Daily Energy Expenditure (TDEE)
  const calculateTDEE = (bmr, activityLevel) => {
    let tdee
    switch (activityLevel) {
      case 'sedentary':
        tdee = bmr * 1.2
        break
      case 'lightlyActive':
        tdee = bmr * 1.375
        break
      case 'moderatelyActive':
        tdee = bmr * 1.55
        break
      case 'veryActive':
        tdee = bmr * 1.725
        break
      case 'extraActive':
        tdee = bmr * 1.9
        break
      default:
        tdee = bmr * 1.2 // Assuming sedentary as default
    }
    return tdee
  }

  // Function to set Goal Caloric Intake based on health goals
  const setGoalCaloricIntake = (tdee, healthGoal) => {
    let goalCalories
    switch (healthGoal) {
      case 'weightLoss':
        goalCalories = tdee - 500 // Create a calorie deficit of 500 calories per day for weight loss
        break
      case 'muscleGain':
        goalCalories = tdee + 300 // Create a calorie surplus of 300 calories per day for muscle gain
        break
      default:
        goalCalories = tdee // Maintain current weight
    }
    return goalCalories
  }

  const bmr = calculateBMR(age, weight, height, gender)
  const tdee = calculateTDEE(bmr, activityLevel)
  const totalCalories = setGoalCaloricIntake(tdee, goal)

  return totalCalories
}
