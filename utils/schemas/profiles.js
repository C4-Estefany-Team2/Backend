const joi = require('@hapi/joi');

const perfileIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);

const perfileImgSchemas = joi.array().items.apply(joi.string());
const perfileNameSchemas = joi.string().max(750);
const perfileSoySchemas = joi.string().max(750);
const perfileBuscoSchemas = joi.string().max(750);
const perfileGustosSchemas = joi.string().max(750);


const createPerfileSchema = {
    img: perfileImgSchemas,
    name: perfileNameSchemas,
    soy: perfileSoySchemas,
    busco: perfileBuscoSchemas,
    gustos: perfileGustosSchemas,
}

const updatePerfileSchema = {
    img: perfileImgSchemas,
    name: perfileNameSchemas,
    soy: perfileSoySchemas,
    busco: perfileBuscoSchemas,
    gustos: perfileGustosSchemas,
}

module.exports = {
    createPerfileSchema,
    updatePerfileSchema,
    perfileIdSchema,
  };