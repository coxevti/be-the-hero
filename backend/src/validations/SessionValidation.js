const { celebrate, Joi, Segments } = require("celebrate");

const index = celebrate({
  [Segments.BODY]: Joi.object().keys({
    id: Joi.string().required()
  })
});

module.exports = { SessionIndexValidation: index };
