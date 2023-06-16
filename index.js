const express = require("express");
const connection = require("./configs/config");
const userRouter = require("./routes/user.routes");
const orderRouter = require("./routes/order.routes");
const authenticate = require("./middleware/authenticate");
const passport = require("passport");
const router = require("./routes/auth");
const session = require("express-session");
var cors = require("cors");
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

require("./configs/passport")(passport);
app.use(
  session({
    secret: "YOUR_SESSION_SECRET",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());

app.use("/user", userRouter);
app.use("/auth", router);
// app.use(authenticate);
app.use("/order", orderRouter);

app.listen(8080, () => {
  try {
    connection;
    console.log("connection to db success");
  } catch (error) {
    console.log("connection to db failed");
  }
  console.log("Listening to port 8080");
});
