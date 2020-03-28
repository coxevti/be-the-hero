const { celebrate, Joi, Segments } = require("celebrate");

const index = celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number()
  })
});

const store = celebrate({
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    value: Joi.number().required()
  }),
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required()
  }).unknown()
});

const destroy = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required()
  }),
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required()
  }).unknown()
});

module.exports = {
  IncidentStoreValidation: store,
  IncidentIndexValidation: index,
  IncidentDeleteValidation: destroy
};
