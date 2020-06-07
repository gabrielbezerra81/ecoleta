import { celebrate, Joi } from "celebrate";

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

export const pointGetValidation = () => {
  return celebrate(
    {
      params: Joi.object().keys({
        id: Joi.number().required(),
      }),
    },
    defaultConfig
  );
};
