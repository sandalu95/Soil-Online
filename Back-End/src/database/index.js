const { Sequelize, DataTypes } = require("sequelize");
const config = require("./db-config.js");

const initUsers = require("./data/initUsers.js");
const products = require("./data/products.js");

const db = {
  Op: Sequelize.Op,
};

// Create Sequelize.
db.sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.DIALECT,
});

// Include models.
db.user = require("./models/user.js")(db.sequelize, DataTypes);
db.cart = require("./models/cart.js")(db, DataTypes);
db.cartItem = require("./models/cartItem.js")(db.sequelize, DataTypes);
db.product = require("./models/product.js")(db.sequelize, DataTypes);
db.reply = require("./models/reply.js")(db.sequelize, DataTypes);
db.review = require("./models/review.js")(db.sequelize, DataTypes);
db.userfollows = require("./models/userfollows.js")(db.sequelize, DataTypes);
db.address = require("./models/address.js")(db.sequelize, DataTypes);
db.order = require("./models/order.js")(db, DataTypes);
db.orderItem = require("./models/orderItem.js")(db.sequelize, DataTypes);

// one-to-many relationship between user-address
// one user can have many addresses, one address can belong to one user
db.address.belongsTo(db.user, {
  onDelete: "CASCADE",
  foreignKey: { email: "email", allowNull: false },
});

db.user.hasOne(db.cart, {
  onDelete: "CASCADE",
});
db.cart.belongsTo(db.user, { foreignKey: { email: "email", allowNull: true } });

db.cart.hasMany(db.cartItem);
db.cartItem.belongsTo(db.cart, { onDelete: "CASCADE" });

db.product.hasMany(db.cartItem);
db.cartItem.belongsTo(db.product, { onDelete: "CASCADE" });

// one-to-many relationship between user-review
db.user.hasMany(db.review, { onDelete: "CASCADE" });
db.review.belongsTo(db.user, {
  onDelete: "CASCADE",
  foreignKey: { email: "email", allowNull: false },
});

// one-to-many relationship between product-review
db.product.hasMany(db.review);
db.review.belongsTo(db.product, { onDelete: "CASCADE" });

// many-to-many relationships between users (as follower and following)
// defaults ON DELETE is CASCADE for Many-To-Many relationships.
// A user can have many followers.
db.user.belongsToMany(db.user, {
  through: db.userfollows,
  as: "follower",
  foreignKey: "followingEmail",
});

// A user can follow many other users.
db.user.belongsToMany(db.user, {
  through: db.userfollows,
  as: "following",
  foreignKey: "followerEmail",
  otherKey: "followingEmail",
});

// one-to-many relationship between user-reply
db.user.hasMany(db.reply, { onDelete: "CASCADE" });
db.reply.belongsTo(db.user, {
  onDelete: "CASCADE",
  foreignKey: { email: "email", allowNull: false },
});

// one-to-many relationship between review-reply
db.review.hasMany(db.reply, { onDelete: "CASCADE" });
db.reply.belongsTo(db.review, {
  onDelete: "CASCADE",
  foreignKey: { id: "id", allowNull: false },
});

// one-to-many relationship between user-order
db.user.hasMany(db.order, {
  foreignKey: "userEmail",
});
db.order.belongsTo(db.user, {
  foreignKey: { email: "email", allowNull: false },
});

db.order.hasMany(db.orderItem);
db.orderItem.belongsTo(db.order, { onDelete: "CASCADE" });

db.product.hasMany(db.orderItem);
db.orderItem.belongsTo(db.product, { onDelete: "CASCADE" });

// Include a sync option with seed data logic included.
db.sync = async () => {
  // Sync schema.
  await db.sequelize.sync();

  // Can sync with force if the schema has become out of date - note that syncing with force is a destructive operation.
  // await db.sequelize.sync({ force: true });

  await seedData();
};

async function seedData() {
  const userCount = await db.user.count();
  // Only seed data if there is no user.
  if (userCount === 0) {
    var bcrypt = require("bcryptjs");
    var salt = bcrypt.genSaltSync(10);

    initUsers.map(async (user) => {
      await db.user.create({
        email: user.email,
        username: user.username,
        passwordHash: bcrypt.hashSync(user.password, salt),
        joinDate: new Date().toLocaleString(),
      });
    });
  }

  const productCount = await db.product.count();
  // Only seed data if there is no product.
  if (productCount === 0) {
    products.map(async (product) => {
      await db.product.create({
        name: product.name,
        price: product.price,
        discount: product.discount,
        stock: product.quantity,
        description: product.description,
        onSale: product.onSale,
        imageUrl: product.imageUrl,
      });
    });
  }
}

module.exports = db;
