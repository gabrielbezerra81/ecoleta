import express from "express";
import PointsController from "./controllers/PointsController";
import ItemsController from "./controllers/ItemsController";
import multer from "multer";
import multerConfig from "./config/multer";
import { celebrate, Joi } from "celebrate";
import {
  pointCreateValidation,
  pointsFilterValidation,
  pointGetValidation,
} from "./validations/validations";

const routes = express.Router();

const upload = multer(multerConfig);

const pointsController = new PointsController();

const itemController = new ItemsController();

routes.get("/items", itemController.index);

routes.post(
  "/points",
  upload.single("image"),
  pointCreateValidation(),
  pointsController.create
);

routes.get("/points", pointsFilterValidation(), pointsController.index);

routes.get("/points/:id", pointGetValidation(), pointsController.show);

export default routes;

// Service Pattern
// Repository Pattern (data mapper)

/*
{
    "name":"Tontonho",
    "email":"contato@imperatriz.com.br",
    "whatsapp":"86998319883",
    "latitude":-6.8373591,
    "longitude":-40.6150946,
    "city":"Pio IX",
    "uf":"PI",
		"items":[1,2]
  }
*/
