const joi = require('@hapi/joi');

const { perfileIdSchema} = require('./profiles');
const { userIdSchema }  = require('./users');

const userPerfileIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);

const createUserPerfileSchema = {
    userId: userIdSchema,
    perfiled: perfileIdSchema
};

module.exports = {
    userPerfileIdSchema,
    createUserPerfileSchema
}