const { celebrate, Joi, Segments } = require("celebrate");

const index = celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required()
  }).unknown()
});

module.exports = { ProfileIndexValidation: index };
