// Reference: Rmit fwp COSC2938 (Semester 1, 2024) Week04.Practical.code
import { toast } from "react-toastify";

export function validate(values) {
  let errors = {};

  // Check if all required fields are provided
  if (!values.name) {
    errors.name = "Name is required";
  }

  if (!values.email) {
    errors.email = "Email address is required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    toast.error("Registration Failed!");
    errors.email = "Email address is invalid";
  }

  // regex to have strong password requirement
  // at least on digit
  // at leaset one upper and lower case letter
  // length is from 8 to 15 characters
  var regex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

  if (!values.password) {
    errors.password = "Password is required";
  } else if (regex.test(values.password) === false) {
    toast.error("Registration Failed!");
    errors.password =
      "Password needs to contain at least one lower case, one upper case, one special char and 8 to 15 characters long";
  }

  if (!errors.password && values.password !== values.confirmPassword) {
    toast.error("Registration Failed!");
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
}
