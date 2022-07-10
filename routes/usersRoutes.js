const controller = require("../controllers/usersController");

module.exports = (app) => {
  app.get("/api/users", controller.getAll);
  app.post("/api/users", controller.create);
  app.post("/api/users/login", controller.login);
};
