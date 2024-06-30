import axios from "axios";

const API_HOST = "http://localhost:4000";
const USER_KEY = "user";

// use user API verify login credentials
async function verifyUser(email, userInputPassword) {
  try {
    const response = await axios.get(API_HOST + "/api/users/login", {
      params: { email, userInputPassword },
    });
    const user = response.data;

    if (user) {
      // store the current user in localStorage
      setLoggedInUser(user);
      return { username: user.username, email: user.email };
    }
  } catch (error) {
    console.error("Login error:", error);

    if (error.response && error.response.status === 403) {
      // User is blocked
      return { error: "Your account has been blocked. Please contact support." };
    }

    return false;
  }
}

// use user API to get all users
async function getUsers() {
  const response = await axios.get(API_HOST + `/api/users/`);

  return response.data;
}

// use user API to retrieve one user data
async function getUserData(email) {
  const response = await axios.get(API_HOST + `/api/users/select/${email}`);
  const user = response.data;
  if (user !== null) {
    return user;
  }
  return false;
}

// use user API to create new user
async function addNewUser(newUser) {
  try {
    const response = await axios.post(API_HOST + "/api/users", newUser, {
      // Resolve only if the status code is less than 500
      validateStatus: (status) => status < 500,
    });

    if (response.status === 201) {
      // User created successfully
      return response.data;
    } else if (response.status === 400) {
      return { error: response.data.message };
    } else {
      // Other errors
      return { error: "An unexpected error occurred" };
    }
  } catch (error) {
    console.error("Error during user creation:", error);
    return { error: "An unexpected error occurred" };
  }
}

// Update user detail info using API
async function updateUser(userData) {
  try {
    const response = await axios.put(API_HOST + `/api/users/update`, userData, {
      validateStatus: (status) => status < 500,
    });

    if (response.status === 400) {
      return { error: response.data.error };
    } else if (response.status === 404) {
      return { error: response.data.error };
    }
  } catch (error) {
    console.error("Error during user detail update", error);
    return { error: "An unexpected error occurred" };
  }
}

// Update user password using API
async function changePassword(passwordData) {
  try {
    const response = await axios.put(
      API_HOST + `/api/users/changepw`,
      passwordData,
      {
        validateStatus: (status) => status < 500,
      }
    );

    if (response.status === 400) {
      return { error: response.data.error };
    }
  } catch (error) {
    return { error: "An unexpected error occurred" };
  }
}

// Get user addresses from API
async function getUserAddresses(email) {
  const response = await axios.get(
    API_HOST + `/api/addresses/${email}/addresses`
  );
  const addresses = response.data;
  if (addresses !== null) {
    return addresses;
  }
  return false;
}

// Update addresses using API
async function updateAddress(addressData) {
  try {
    const response = await axios.put(
      API_HOST + `/api/addresses/update`,
      addressData,
      {
        validateStatus: (status) => status < 500,
      }
    );

    if (response.status === 400) {
      return { error: response.data.error };
    }
    return response.data;
  } catch (error) {
    return { error: "An unexpected error occurred" };
  }
}

// Create new address for user
async function createAddress(email, addressType, newAddress) {
  try {
    const response = await axios.post(
      API_HOST + `/api/addresses/create`,
      { email, addressType, newAddress },
      {
        // Resolve only if the status code is less than 500
        validateStatus: (status) => status < 500,
      }
    );

    if (response.status === 400) {
      return { error: response.data.error };
    }

    return response.data;
  } catch (error) {
    return { error: "An unexpected error occurred" };
  }
}

// TODO:remove user using API
async function removeUserAccount(emailToRemove, passwordData) {
  try {
    // reference: https://apidog.com/articles/make-axios-delete-requests/
    const response = await axios.delete(API_HOST + `/api/users/delete`, {
      data: { emailToRemove, passwordData },
      validateStatus: (status) => true,
    });

    if (response.status === 404) {
      return { error: response.data.error };
    } else if (response.status === 401) {
      return { error: response.data.error };
    } else if (response.status === 400) {
      return { error: response.data.error };
    } else if (response.status === 500) {
      return { error: response.data.error };
    } else {
      // return successful delete message
      return { message: response.data.message };
    }
  } catch (error) {
    return { error: "An unexpected error occurred" };
  }
}

// --- Helper functions to interact with local storage ---
function setLoggedInUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

function getLoggedInUser() {
  const value = localStorage.getItem(USER_KEY);
  return value ? JSON.parse(value) : undefined;
}

function removeLoggedInUser() {
  localStorage.removeItem(USER_KEY);
}

export {
  getUsers,
  getUserData,
  verifyUser,
  addNewUser,
  updateUser,
  changePassword,
  getUserAddresses,
  updateAddress,
  createAddress,
  setLoggedInUser,
  getLoggedInUser,
  removeLoggedInUser,
  removeUserAccount,
};
