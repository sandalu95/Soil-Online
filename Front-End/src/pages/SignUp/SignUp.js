import React from "react";
import { useNavigate, Link } from "react-router-dom";
import useForm from "../../hooks/useForm";
import { validate } from "../../utils/SignupValidationRules";
import { addNewUser } from "../../data/repository";
import "../Login/login.css";
import { toast } from "react-toastify";
import { removeCartId } from "../../data/cart";
import { useCart } from "../../hooks/useCart";

function SignUp({ onLogin }) {
  const navigate = useNavigate();
  const { initializeCart } = useCart();

  const handleLogin = (name, email, joindate) => {
    removeCartId();
    onLogin({
      username: name,
      email: email,
      joindate: joindate,
    });
    initializeCart(email);
  };

  const submit = async (values) => {
    const joindate = new Date().toDateString();

    const newUser = {
      username: values.name,
      email: values.email,
      password: values.password,
      joindate: joindate,
    };

    // Save user details in localStorage
    const result = await addNewUser(newUser);

    if (result.error) {
      // Handle error
      toast.error(`Registration failed: ${result.error}`);
    } else {
      // visual cue
      toast.success("Registration successful", {
        onClose: () => {
          // Automatically log in user and redirect to homepage
          handleLogin(values.name, values.email, result.joinDate);
          // redirect to homepage
          navigate("/");
          toast(`Welcome to Soil ${values.name}`);
        },
      });
    }
  };

  // use useForm customized hook to handle user input and interaction
  const { fieldOf, handleSubmit } = useForm(submit, validate);

  // created a template for the field html
  const field = (fieldName, fieldLabel, inputProps) => {
    const { value, error, onChange } = fieldOf(fieldName);

    return (
      <div className="field">
        <label className="label mt-3">{fieldLabel}</label>
        <div className="control">
          <input
            {...inputProps}
            className={`form-control ${error && "is-danger"}`}
            onChange={onChange}
            value={value}
          />
          {error && <p className="text-danger">{error}</p>}
        </div>
      </div>
    );
  };

  const nameInput = field("name", "Name", {
    type: "text",
    required: true,
  });

  const emailInput = field("email", "Email", {
    type: "email",
    required: true,
  });

  const passwordInput = field("password", "Password", {
    type: "password",
    required: true,
  });

  const confirmPasswordInput = field("confirmPassword", "Confirm Password", {
    type: "password",
    required: true,
  });

  return (
    <div className="row ">
      <div className="col">
        <img
          alt="signup-girl"
          src={require("../../assets/soil_signUp.png")}
          style={{
            "object-fit": "cover",
            height: "100%",
            width: "100%",
          }}
        ></img>
      </div>

      <div className="col mt-3">
        <Link to="/" className="btn btn-custom mb-3">
          Back To Home
        </Link>

        <div className="text-center">
          <h1>Sign Up</h1>
        </div>
        <h5>Let's create your account</h5>
        <div></div>
        <div className="link-wr">
          <span>
            Already a member?{" "}
            <a href="/login" className="custom-nav-link">
              Login here
            </a>
          </span>
        </div>
        <div className="mt-3">
          <form onSubmit={handleSubmit} noValidate>
            {nameInput}
            {emailInput}
            {passwordInput}
            {confirmPasswordInput}
            <button type="submit" className="btn btn-custom mt-3">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
