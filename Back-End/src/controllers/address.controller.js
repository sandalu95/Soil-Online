const db = require("../database");

// Select all addresses from the database.
exports.all = async (req, res) => {
  const addresses = await db.address.findAll();

  res.json(addresses);
};

// Select one address from the database based on id.
exports.one = async (req, res) => {
  const address = await db.address.findByPk(req.params.id);

  res.json(address);
};

// Get all addresses associated with a specific user
exports.getUserAddresses = async (req, res) => {
  try {
    const userEmail = req.params.email;

    const addresses = await db.address.findAll({
      where: { userEmail },
    });

    if (!addresses) {
      return res
        .status(404)
        .json({ message: "No addresses found for this user" });
    }

    res.json(addresses);
  } catch (error) {
    console.error("Error fetching addresses:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// TODO: update shipping address
exports.update = async (req, res) => {
  try {
    const { id, country, addLine1, addLine2, suburb, state, postcode } =
      req.body;
    // Check if all required fields are provided
    if (!country || !suburb || !state || !postcode) {
      return res.status(400).json({ error: "Please fill all required form" });
    }

    if (!req.body) {
      return res.status(404).json({ error: "Address not found" });
    }

    // Convert state to uppercase
    const stateUpper = state.toUpperCase();

    const address = await db.address.findByPk(id);

    await db.address.update(
      {
        country,
        addLine1,
        addLine2,
        suburb,
        state: stateUpper,
        postcode,
      },
      { where: { id } }
    );
    // Response successful
    if (address) {
      res.status(200).json({ id: address.id });
    } else {
      res.status(200).json({});
    }
  } catch (error) {}
};

// Create new address for user
exports.create = async (req, res) => {
  try {
    const userEmail = req.body.email;
    const addressType = req.body.addressType;
    const { country, addLine1, addLine2, suburb, state, postcode } =
      req.body.newAddress;

    // Check if all required fields are provided
    if (!country || !suburb || !state || !postcode) {
      return res.status(400).json({ error: "Please fill all required form" });
    }

    // Convert state to uppercase
    const stateUpper = state.toUpperCase();

    const result = await db.address.create({
      userEmail: userEmail,
      addressType,
      country,
      addLine1,
      addLine2,
      suburb,
      state: stateUpper,
      postcode,
    });

    res.status(200).json({ id: result.id });
  } catch (error) {}
};
