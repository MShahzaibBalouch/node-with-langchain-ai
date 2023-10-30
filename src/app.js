const express = require("express");
const app = express();
const cors = require("cors");
const middleware = require("./middleware/middleware");
app.use(express.json());
app.use(cors());
app.use(middleware);
require("dotenv").config();

const port = process.env.PORT || 5000;

const chatRoute = require("./routes/chat");
app.use("/api", chatRoute);
const userRoute = require("./routes/user");
app.use('/api/user', userRoute);


app.listen(port, () => {
  console.log(
    "Hi! I'm Node Server and I'm running on the port http://localhost:" + port
  );
});

