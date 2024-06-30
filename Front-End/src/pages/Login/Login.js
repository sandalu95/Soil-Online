import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { verifyUser } from "../../data/repository";
import { validate } from "../../utils/LoginFormValidationRules";
import "./login.css";
import { toast } from "react-toastify";
import { useCart } from "../../hooks/useCart";
import { removeCartId } from "../../data/cart";

// Reference: Rmit fwp COSC2938 (Semester 1, 2024) Week03.Lectorial.code
function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const { initializeCart } = useCart();

  const handleLogin = (user) => {
    removeCartId();
    onLogin(user);
    initializeCart(user.email);
  };

  const verifyCredentials = async (event) => {
    event.preventDefault();
  
    // validate user input
    const errors = validate({ email: email, password: password });
    setEmailError(errors.email);
    setPasswordError(errors.password);
  
    // verify user credentials
    const user = await verifyUser(email, password);
    if (user && !user.error) {
      // pass authenticated user information
      toast.success("Login Successful!");
      toast(`Welcome to Soil ${user.username}`);

      handleLogin(user);
      setTimeout(() => navigate("/account/settings"), 1000);
      return;
    }
  
    // if login not successful
    if (user.error) {
      toast.error(user.error);
      setErrorMessage(user.error);
    } else {
      toast.error("Login Failed!");
      setErrorMessage("Username and / or password invalid, please try again.");
    }
    setPassword("");
  };
  

  return (
    <div className="container">
      <h1>Login</h1>
      <hr />
      <div className="row">
        <div className="col-md-6">
          <form onSubmit={verifyCredentials}>
            <div className="form-group">
              <label htmlFor="email" className="control-label">
                Email
              </label>
              <div className="control">
                <input
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {emailError && <p className="text-danger">{emailError}</p>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password" className="control-label">
                Password
              </label>
              <div className="control">
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {passwordError && <p className="text-danger">{passwordError}</p>}
              {errorMessage !== null && (
                <p className="text-danger">{errorMessage}</p>
              )}
            </div>
            <div className="form-group">
              <input type="submit" className="btn btn-custom" value="Login" />
              <span className="ml-2">
                New to Soil online?{" "}
                <a href="/signup" className="custom-nav-link">
                  Join today
                </a>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
