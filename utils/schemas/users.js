const joi = require('@hapi/joi');

const userIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);



const createUserSchema = {
  name: joi
    .string()
    .max(100)
    .required(),
  email: joi
    .string()
    .email()
    .required(),
  password: joi.string().required(),
  data: joi.date().required(),
  phone: joi.number().required(),
  isAdmin: joi.boolean(),

//Datos si se hace los match

  datoUno: joi.string(),
  datoDos: joi.string(),
  datoTres: joi.string()
};

module.exports = {
  userIdSchema,
  createUserSchema
};