//map routes to controller
"use strict";

const { controller } = require("./controller");

module.exports = (app) => {
  app.route("/pets").get(controller.getPets);
  app.route("/pets").post(controller.putPet);
};