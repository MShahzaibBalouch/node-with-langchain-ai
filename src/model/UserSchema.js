const Sequelize = require("sequelize");

const sequelize = new Sequelize("sql12657828", "sql12657828", "FEBRDF798j", {
  host: "sql12.freesqldatabase.com",
  dialect: "mysql",
});

const User = sequelize.define("User", {
  firstname: {
    type: Sequelize.STRING,
    unique: false,
    allowNull: true,
  },
  lastname: {
    type: Sequelize.STRING,
    unique: false,
    allowNull: true,
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  role: {
    type: Sequelize.STRING,
    unique: false,
    allowNull: true,
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
  updatedAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
});

module.exports = { sequelize, User };

sequelize.sync().then(() => {
  console.log("Schema and user table created successfully!");
});
