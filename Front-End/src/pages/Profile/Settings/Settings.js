import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import {
  updateUser,
  setLoggedInUser,
  getUserData,
  removeLoggedInUser,
  removeUserAccount,
  changePassword,
} from "../../../data/repository";
import { removeCartId } from "../../../data/cart";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCart } from "../../../hooks/useCart";

const Settings = ({ user }) => {
  const navigate = useNavigate();
  const { initializeCart } = useCart();

  // fetch user info from API
  useEffect(() => {
    const fetchData = async () => {
      // get data from API
      const data = await getUserData(user.email);

      // set default userInfo in the form
      setFormData({
        email: user.email,
        name: data?.username,
        phone: data?.mobile,
        joinDate: data?.joinDate,
      });
    };

    fetchData().catch(console.error);
  }, [user]);

  // Display user's current details which are saved
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    phone: "",
    joinDate: "",
  });

  const [passwordData, setPasswordData] = useState({});
  const [errors, setErrors] = useState(null);

  // Account Settings form validation
  const validate = (formData) => {
    const errors = {};

    const phoneno = /^\d{10}$/;
    if (formData?.phone && !formData?.phone.match(phoneno)) {
      errors.phone = "Invalid Phone Number";
    }

    if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
      errors.name = "Invalid Name";
    }

    return errors;
  };

  // Validation function for passwords
  const validatePassword = (passwordData) => {
    const errors = {};

    // regex to have strong password requirement - at least one digit, one upper and lower case letter and 8 to 15 characters
    var regex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

    // check if the password is empty string or undefined
    if (passwordData.currPass === "" || passwordData.currPass === undefined) {
      errors.currPassErr = "Please enter your current Password";
    }

    if (passwordData.newPass === "") {
      errors.newPassErr = "Please enter the new Password";
    }
    if (passwordData.confPass === "") {
      errors.confPassErr = "Please confirm the new Password";
    } else if (passwordData.newPass !== passwordData.confPass) {
      errors.confPassErr = "Passwords doesn't match";
    }

    if (regex.test(passwordData.newPass) === false) {
      errors.newPassErr =
        "Password needs to contain at least one lower and one upper case and 8 to 15 characters long";
    }

    if (passwordData.deleteConfirm === "") {
      errors.deleteConfirmErr = "Please enter the Password to confirm deletion";
    }
    return errors;
  };

  // Function to handle field changes of the account update form
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Function to handle password changing fields
  const handlePasswordChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  // Function to handle the account details update form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(null);

    const errors = validate(formData);

    if (Object.keys(errors).length > 0) {
      toast.error("Account update failed!");
      setErrors(errors);
    } else {
      const tempLoggedInUser = user;
      tempLoggedInUser.name = formData.name;
      tempLoggedInUser.phone = formData.phone;
      setLoggedInUser(tempLoggedInUser);

      const userData = {
        email: user.email,
        username: formData.name,
        mobile: formData.phone,
      };

      const result = await updateUser(userData);

      if (result?.error) {
        // Handle error
        toast.error(`Update failed: ${result.error}`);
      } else {
        toast.success("Account details updated successfully!");
      }
    }
  };

  // Function to handle the password change form submission
  const changePasswordSubmit = async (e) => {
    e.preventDefault();
    setErrors(null);

    const passErrors = validatePassword(passwordData);

    if (Object.keys(passErrors).length > 0) {
      toast.error("Password change failed!");
      setErrors(passErrors);
    } else {
      const userData = {
        email: user.email,
        currPass: passwordData.currPass,
        newPass: passwordData.newPass,
        confPass: passwordData.confPass,
      };
      const result = await changePassword(userData); // Update new password in user data

      if (result?.error) {
        // Handle error
        toast.error(`Change password failed: ${result.error}`);
      } else {
        setPasswordData({}); // Empty the password fields after successful
        toast.success("Password updated successfully!");
      }
    }
  };

  // Function to handle the account deletion
  const handleDeleteAccount = async () => {
    //  check if the password is empty string or undifined
    if (
      passwordData.deleteConfirm !== "" &&
      passwordData.deleteConfirm !== undefined
    ) {
      const result = await removeUserAccount(
        user.email,
        passwordData.deleteConfirm
      );

      // Handle error
      if (result?.error) {
        toast.error(`Account Deletion failed: ${result.error}`);
      } else {
        // remove cart and loggedInUser from localstorage
        removeCartId();
        removeLoggedInUser();
        toast.success(result.message);
        initializeCart();
        navigate("/");
      }
    } else {
      toast.error("Invalid current password. Account deletion failed!");
    }
  };

  return (
    <>
      {user && (
        <Row>
          <Col>
            <Card className="my-3">
              <Card.Header>Account Details</Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      value={formData.email}
                      disabled
                      name="email"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.name}
                      name="name"
                      onChange={handleChange}
                    />
                    {errors?.name && (
                      <Form.Text className="text-danger">
                        {errors.name}
                      </Form.Text>
                    )}
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formPhone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.phone}
                      name="phone"
                      onChange={handleChange}
                    />
                    {errors?.phone && (
                      <Form.Text className="text-danger">
                        {errors.phone}
                      </Form.Text>
                    )}
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formDate">
                    <Form.Label>Date of Joining</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.joinDate}
                      disabled
                    />
                  </Form.Group>
                  <Button className="btn-custom" type="submit">
                    Save Changes
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="my-3">
              <Card.Header>Change Password</Card.Header>
              <Card.Body>
                <Form onSubmit={changePasswordSubmit}>
                  <Form.Group className="mb-3" controlId="formCurrPassword">
                    <Form.Label>Current Password</Form.Label>
                    <Form.Control
                      type="password"
                      onChange={handlePasswordChange}
                      name="currPass"
                      value={passwordData?.currPass || ""}
                    />
                    {errors?.currPassErr && (
                      <Form.Text className="text-danger">
                        {errors.currPassErr}
                      </Form.Text>
                    )}
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formNewPassword">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                      type="password"
                      onChange={handlePasswordChange}
                      name="newPass"
                      value={passwordData?.newPass || ""}
                    />
                    {errors?.newPassErr && (
                      <Form.Text className="text-danger">
                        {errors.newPassErr}
                      </Form.Text>
                    )}
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formConfirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      onChange={handlePasswordChange}
                      name="confPass"
                      value={passwordData?.confPass || ""}
                    />
                    {errors?.confPassErr && (
                      <Form.Text className="text-danger">
                        {errors.confPassErr}
                      </Form.Text>
                    )}
                  </Form.Group>
                  <Button className="btn-custom" type="submit">
                    Change Password
                  </Button>
                </Form>
              </Card.Body>
            </Card>
            <Card className="my-3">
              <Card.Header>Delete Account</Card.Header>
              <Card.Body>
                <Form>
                  <Form.Group className="mb-3" controlId="formCurrPasswordDel">
                    <Form.Label>
                      Enter your password to confirm deletion{" "}
                    </Form.Label>
                    <Form.Control
                      type="password"
                      onChange={handlePasswordChange}
                      name="deleteConfirm"
                      value={passwordData?.deleteConfirm || ""}
                    />
                  </Form.Group>
                  <Button className="btn-danger" onClick={handleDeleteAccount}>
                    Delete Account
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default Settings;
