const express = require("express");
require("dotenv").config();

const app = express();
const bodyParser = require("body-parser");
const sessionMiddleware = require("./modules/session-middleware");

const passport = require("./strategies/user.strategy");

// Route includes
const userRouter = require("./routes/user.router");
const linkRouter = require("./routes/link.router");
const feedbackRouter = require("./routes/feedback.router");
const detailsRouter = require("./routes/details.router");
const tagsRouter = require("./routes/tags.router");
const graphRouter = require("./routes/graph.router");
const clicksRouter = require("./routes/clicks.router");
const baseUrlRouter = require("./routes/baseUrl.router");

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use("/api/user", userRouter);
app.use("/api/link", linkRouter);
app.use("/api/feedback", feedbackRouter);
app.use("/api/details", detailsRouter);
app.use("/api/tags", tagsRouter);
app.use("/api/graph", graphRouter);
app.use("/api/clicks", clicksRouter);
app.use("/api/base-url", baseUrlRouter);

// Serve static files
app.use(express.static("build"));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
