const express = require("express");

const routes = express.Router();

const OngController = require("./controllers/OngController");
const IncidentController = require("./controllers/IncidentController");
const ProfileController = require("./controllers/ProfileController");
const SessionController = require("./controllers/SessionController");

const {
  IncidentIndexValidation,
  IncidentStoreValidation,
  IncidentDeleteValidation
} = require("./validations/IncidentValidation");
const { OngStoreValidation } = require("./validations/OngValidation");
const { ProfileIndexValidation } = require("./validations/ProfileValidation");
const { SessionIndexValidation } = require("./validations/SessionValidation");

routes.post("/sessions", SessionIndexValidation, SessionController.store);

routes.get("/ongs", OngController.index);
routes.post("/ongs", OngStoreValidation, OngController.store);

routes.get("/profile", ProfileIndexValidation, ProfileController.index);

routes.get("/incidents", IncidentIndexValidation, IncidentController.index);
routes.post("/incidents", IncidentStoreValidation, IncidentController.store);
routes.delete(
  "/incidents/:id",
  IncidentDeleteValidation,
  IncidentController.delete
);

module.exports = routes;
