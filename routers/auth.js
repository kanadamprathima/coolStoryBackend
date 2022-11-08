const bcrypt = require("bcrypt");
const { Router } = require("express");
const User = require("../models/").user;
const Space = require("../models/").space;
const Story = require("../models").story;
const { toJWT } = require("../auth/jwt");
const authMiddleware = require("../auth/middleware");
const { SALT_ROUNDS } = require("../config/constants");

const router = new Router();

//login
//F4 http POST :4000/auth/login email=mango@mango.com password=mango
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .send({ message: "Please provide both email and password" });
    }

    const user = await User.findOne({ where: { email } });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(400).send({
        message: "User with that email not found or password incorrect",
      });
    }
    // F4 Logging in finds the mySpace
    const mySpace = await Space.findOne({
      where: { userId: user.id },
      include: [Story],
    });

    delete user.dataValues["password"]; // don't send back the password hash
    const token = toJWT({ userId: user.id });
    return res
      .status(200)
      .send({ token, user: user.dataValues, mySpace: mySpace }); // F4 ..send mySpace in the response
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: "Something went wrong, sorry" });
  }
});

//signup  http POST :4000/auth/signup name=alphanso email=mango@mango1.com password=mango

//step:1 signup and themn get a token and
//step2:use the token to know the user details along with mySpaces .....http :4000/auth/me Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjksImlhdCI6MTY2Nzg1NTA4NiwiZXhwIjoxNjY3ODYyMjg2fQ.IkkUBCr46NN3TckTU949OPuwY4LUuyb4NPFYlB0Narw"
router.post("/signup", async (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password || !name) {
    return res.status(400).send("Please provide an email, password and a name");
  }

  try {
    const newUser = await User.create({
      email,
      password: bcrypt.hashSync(password, SALT_ROUNDS),
      name,
    });

    delete newUser.dataValues["password"]; // don't send back the password hash
    //F3 signing up creates a newspace

    const newSpace = await Space.create({
      title: `${name}'s space`,
      description: null,
      backgroundColor: "#ffffff",
      color: "#000000",
      userId: newUser.id, // EXTRA: Creates the userId in space table
    });
    const fullSpace = await Space.findByPk(newSpace.id, {
      include: [Story],
    });

    const token = toJWT({ userId: newUser.id });
    // F3 ..Add newSpace in response!
    res.status(201).json({ token, user: newUser.dataValues, space: fullSpace });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res
        .status(400)
        .send({ message: "There is an existing account with this email" });
    }

    return res.status(400).send({ message: "Something went wrong, sorry" });
  }
});

// The /me endpoint can be used to:
// - get the users email & name using only their token
// - checking if a token is (still) valid
router.get("/me", authMiddleware, async (req, res) => {
  // don't send back the password hash
  delete req.user.dataValues["password"];
  //F4 /me finds mySpace values.
  const mySpace = await Space.findOne({
    where: { userId: req.user.id },
    include: Story,
  });
  res.status(200).send({ ...req.user.dataValues, mySpace: mySpace }); //F4 . send myspace in response.send
});

module.exports = router;
