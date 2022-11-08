//packages
const express = require("express");
const corsMiddleWare = require("cors");
const User = require("./models").user;
const Space = require("./models").space;
const Story = require("./models").story;
const spaceRouter = require("./routers/space");

//routers
const authRouter = require("./routers/auth");

//constants
const { PORT } = require("./config/constants");

// Create an express app
const app = express();

// CORS middleware:  * Since our api is hosted on a different domain than our client
// we are are doing "Cross Origin Resource Sharing" (cors)
// Cross origin resource sharing is disabled by express by default
app.use(corsMiddleWare());

// express.json() to be able to read request bodies of JSON requests a.k.a. body-parser
app.use(express.json());
app.get("/users", async (req, res, next) => {
  const allusers = await User.findAll({ raw: true });
  res.send(allusers);
});

//routes
app.use("/auth", authRouter);
app.use("/spaces", spaceRouter);

//start listening
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
