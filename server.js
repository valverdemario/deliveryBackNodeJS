const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const logger = require("morgan");
const cors = require("cors");
const passport = require("passport");
/* RUTAS */
const routes = require("./routes/usersRoutes");

const port = 3000;

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

require("./config/passport")(passport);

app.disable("x-powered-by");
app.set("port", port);

routes(app);

server.listen(port, "localhost", function () {
  console.log("Server listening on port " + port);
});

//ERROREs
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send("Something broke!");
});

module.exports = {
  app: app,
  server: server,
};
