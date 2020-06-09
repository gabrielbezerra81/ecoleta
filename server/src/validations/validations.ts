import { celebrate, Joi } from "celebrate";
import { chosenDB, mongoDB } from "../server";

const defaultConfig = { abortEarly: false };

export const pointCreateValidation = () => {
  return celebrate(
    {
      body: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required(),
        latitude: Joi.number().required(),
        longitude: Joi.number().required(),
        city: Joi.string().required(),
        uf: Joi.string().required().max(2),
        items: Joi.string().required(),
      }),
    },
    defaultConfig
  );
};

export const pointsFilterValidation = () => {
  return celebrate(
    {
      query: {
        city: Joi.string().required(),
        items: Joi.string().required(),
        uf: Joi.string().required().max(2),
      },
    },
    defaultConfig
  );
};

// Mongo validation: id => string.     SQLite validation: id => number
export const pointGetValidation = () => {
  const idValidation =
    chosenDB === mongoDB
      ? {
          id: Joi.string().required(),
        }
      : {
          id: Joi.number().required(),
        };

  return celebrate(
    {
      params: Joi.object().keys(idValidation),
    },
    defaultConfig
  );
};
