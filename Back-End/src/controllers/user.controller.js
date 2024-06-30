const db = require("../database");
var bcrypt = require("bcryptjs");

// Select all users from the database.
exports.all = async (req, res) => {
  const users = await db.user.findAll();

  res.json(users);
};

// Select one user from the database.
exports.one = async (req, res) => {
  const user = await db.user.findByPk(req.params.email);

  res.json(user);
};

// Select one user from the database if email and password are a match.
exports.login = async (req, res) => {
  try {
    const user = await db.user.findByPk(req.query.email);
    if (!user) {
      // cannot find user in db, Login failed.
      return res.status(401).json({ message: "Login failed. User not found." });
    }

    if (user.isBlocked) {
      // User is blocked
      return res.status(403).json({ message: "Your account has been blocked. Please contact support." });
    }

    let isPasswordMatch;
    // Compare the user input password with stored hashed password
    isPasswordMatch = bcrypt.compareSync(
      req.query.userInputPassword,
      user.passwordHash
    );

    if (!isPasswordMatch)
      // Login failed.
      return res
        .status(401)
        .json({ message: "Login failed. Incorrect password." });

    // Login successful
    res.json(user);
  } catch (errors) {
    // Handle any errors that occurred during the process
    console.error("Error during login:", error);
    res.status(500).json({ message: "An error occurred during login." });
  }
};

// Create a user in the database.
exports.create = async (req, res) => {
  try {
    // Back-end Input validation
    const { email, username, password } = req.body;
    if (!email || !username || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if email already in the db
    const userExist = await db.user.findByPk(email);

    if (userExist) {
      if (userExist.email === email) {
        return res.status(400).json({
          status: "error",
          message: "Email already exists. Please use another one.",
        });
      }
    }

    // If email not taken, create new user
    // Hash the password
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    // Create new user
    const user = await db.user.create({
      email: req.body.email,
      username: req.body.username,
      passwordHash: hashedPassword,
      joinDate: new Date().toLocaleString(),
    });

    res.status(201).json(user);
  } catch (error) {
    console.log(error);

    console.error("Error during user creation:", error);
    if (error.name === "SequelizeUniqueConstraintError") {
      res.status(400).json({
        status: "error",
        message: "Username already exists. Please use another one.",
      });
    } else {
      res
        .status(500)
        .json({ status: "error", message: "Something went wrong" });
    }
  }
};

// Update username and mobile
exports.update = async (req, res) => {
  try {
    const { email, username, mobile } = req.body;

    // Check if all required fields are provided
    if (!username) {
      return res.status(400).json({ error: "Username is required" });
    }

    // Check if username is unique
    const existingUser = await db.user.findOne({ where: { username } });
    if (existingUser && existingUser.email !== email) {
      return res.status(400).json({ error: "Username already taken" });
    }

    // check mobile format
    const phoneFormat = /^\d{10}$/;
    // if user provided mobile then check format
    if (mobile && !mobile.match(phoneFormat)) {
      return res.status(400).json({ error: "Invalid Phone Number" });
    }

    // Update user information
    await db.user.update({ username, mobile }, { where: { email } });
    // Response successful
    res.status(200).json({});
  } catch (error) {}
};

// TODO: Update password
exports.changePassword = async (req, res) => {
  try {
    const { email, currPass, newPass, confPass } = req.body;

    // Back-end validation
    // 1. Check if all required fields are provided
    if (!currPass || !newPass || !confPass) {
      return res
        .status(400)
        .json({ error: "Please enter all required fields" });
    }

    // 2. Check if the currPass is correct
    const userExist = await db.user.findByPk(email);
    const isPasswordMatch = bcrypt.compareSync(
      currPass,
      userExist.passwordHash
    );
    if (!isPasswordMatch) {
      return res.status(400).json({ error: "Invalid current password" });
    }

    // 3. Check if newPass satisfy strong password requirement
    // regex to have strong password requirement - at least one digit, one upper and lower case letter and 8 to 15 characters
    var regex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    if (regex.test(newPass) === false) {
      return res.status(400).json({
        error: "Weak password. Ensure it meets all strength requirements.",
      });
    }
    // 4. Check if newPass match confPass
    if (newPass !== confPass) {
      return res.status(400).json({ error: "Passwords doesn't match" });
    }

    // Hash the password
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(newPass, salt);
    // Update password
    await db.user.update(
      { passwordHash: hashedPassword },
      { where: { email } }
    );
    // Response successful
    res.status(200).json({});
  } catch (error) {}
};

// TODO: delete account
exports.delete = async (req, res) => {
  const t = await db.sequelize.transaction();
  try {
    const email = req.body.emailToRemove;
    const deleteConfirm = req.body.passwordData;

    // Back-end validation
    // 1. Check if required fields are provided
    if (!deleteConfirm) {
      return res.status(400).json({ error: "Please enter required fields" });
    }

    // 2. Validate email, find the user
    const user = await db.user.findByPk(email);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // 3. Compare the provided password with the stored hashed password
    const isPasswordMatch = bcrypt.compareSync(
      deleteConfirm,
      user.passwordHash
    );
    if (!isPasswordMatch) {
      return res
        .status(401)
        .json({ error: "Invalid password. Account deletion failed." });
    }

    // Delete the user
    await db.user.destroy({ where: { email }, transaction: t });

    // Commit the transaction
    await t.commit();

    res
      .status(200)
      .json({ message: "Account and associated data deleted successfully" });
  } catch (error) {
    // Rollback the transaction in case of error
    await t.rollback();
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
