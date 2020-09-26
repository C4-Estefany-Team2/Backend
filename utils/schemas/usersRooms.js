const joi = require('@hapi/joi');

const { roomIdSchema } = require('./rooms');
const { userIdSchema }  = require('./users');

const userRoomIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);

const createUserRoomSchema = {
    userId: userIdSchema,
    roomId: roomIdSchema
};

module.exports = {
    userRoomIdSchema,
    createUserRoomSchema
}