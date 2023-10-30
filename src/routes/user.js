const express = require("express");
const { sequelize, User } = require("../model/UserSchema");
const session = require("express-session");

const jwt = require("jsonwebtoken");

const secretKey = process.env.SECRET_KEY || "your@secrit.keyfor@rwa";

function middleware(req, res, next) {
  console.log(`Request received: ${req.method} ${req.url}`);
  next();
}
function verifyToken(req, res, next) {
  const token = req.session.token || req.headers["authorization"];
  if (!token) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    req.admin = decoded;
    next();
  });
}

const router = express.Router();
router.use(middleware);
router.use(
  session({
    secret: secretKey,
    resave: false,
    saveUninitialized: true,
  })
);

router.get("/", async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const user = await User.findByPk(id);
  if (!user) {
    res.status(404).json("User not found");
  }
  res.json(user);
});

router.post("/", async (req, res) => {
  const { firstname, lastname, email, password, role } = req.body;
  const user = await User.create({
    firstname,
    lastname,
    email,
    password,
    role,
  });
  res.status(201).json(user);
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });

  if (user) {
    if (user.password === password) {
      const payload = {
        id: user.id,
        email: user.email,
        name: user.firstname,
      };

      const token = jwt.sign(
        { firstname: user.firstname, userId: user._id },
        secretKey,
        { expiresIn: "5m" }
      );
      req.session.token = token;

      res.json({ token: token, user: user });
    } else {
      res.status(401).json({ user: "Invalid password" });
    }
  } else {
    console.error("User Not Fond");

    res.status(404).json({ user: "User Not Fond" });
  }
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { username, email, password } = req.body;

  const user = await User.findByPk(id);
  if (!user) {
    res.status(404).json("User not found");
  }

  await user.update({ username, email, password });
  res.json(user);
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const user = await User.findByPk(id);
  if (!user) {
    res.status(404).json("User not found");
  }

  await user.destroy();
  res.status(204).json();
});

module.exports = router;
