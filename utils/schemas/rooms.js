const joi = require('@hapi/joi');

const roomIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);

const roomNameSchema = joi.string().max(80);
const roomImagesSchema = joi.array().items(joi.string());
const roomDescriptionSchema = joi.string().max(750);
const roomLocationSchema = joi.string().max(50);
const roomPriceSchema = joi.number().max(1000000);
const roomOcupationSchema = joi.number().max(30).min(1);
const roomcreatedAt = joi.date();

const createRoomSchema = {
  name: roomNameSchema.required(),
  images: roomImagesSchema,
  description: roomDescriptionSchema.required(),
  location: roomLocationSchema.required(),
  price: roomPriceSchema.required(),
  ocupation: roomOcupationSchema.required(),
  createdAt: roomcreatedAt,
};

const updateRoomSchema = {
  name: roomNameSchema,
  images: roomImagesSchema,
  description: roomDescriptionSchema,
  location: roomLocationSchema,
  price: roomPriceSchema,
  ocupation: roomOcupationSchema,
};

module.exports = {
  roomIdSchema,
  createRoomSchema,
  updateRoomSchema,
};