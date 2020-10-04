const joi = require('@hapi/joi');

const roomIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);

const roomNameSchema = joi.string().max(80);
const roomImagesSchema = joi.array().items(joi.string());
const roomDescriptionSchema = joi.string().max(750);
const roomLocationSchema = joi.string().max(50);
const roomPriceSchema = joi.number().max(1000000);
const roomOcupationSchema = joi.number().max(30).min(1);
const roomIdHostSchema = joi.string().max(500);
const roomCorreoHostSchema = joi.string().max(20);
const roomTelefonoHostSchema = joi.number();
const roomEdadHostSchema = joi.number();
const roomNameHost = joi.string();
const roomWcSchema = joi.boolean();
const roomWifiSchema = joi.boolean();
const roomDesayunoSchema = joi.boolean();
const roomLavanderiaSchema = joi.boolean();
const roomTelefonoSchema = joi.boolean();
const roomcreatedAt = joi.date();

const createRoomSchema = {
  name: roomNameSchema.required(),
  images: roomImagesSchema,
  description: roomDescriptionSchema.required(),
  location: roomLocationSchema.required(),
  price: roomPriceSchema.required(),
  ocupation: roomOcupationSchema.required(),
  idHost: roomIdHostSchema,
  nameHost: roomNameHost,
  wc: roomWcSchema,
  Wifi: roomWifiSchema,
  desyuno: roomDesayunoSchema,
  Lacanderia: roomLavanderiaSchema,
  telefono:  roomTelefonoSchema,
  correoHost: roomCorreoHostSchema,
  telefonoHost: roomTelefonoHostSchema,
  edadHost: roomEdadHostSchema,
  createdAt: roomcreatedAt,
};

const updateRoomSchema = {
  name: roomNameSchema,
  images: roomImagesSchema,
  description: roomDescriptionSchema,
  location: roomLocationSchema,
  price: roomPriceSchema,
  idHost: roomIdHostSchema,
  wc: roomWcSchema,
  Wifi: roomWifiSchema,
  desyuno: roomDesayunoSchema,
  Lacanderia: roomLavanderiaSchema,
  telefono:  roomTelefonoSchema,
  nameHost: roomNameHost,
  correoHost: roomCorreoHostSchema,
  telefonoHost: roomTelefonoHostSchema,
  edadHost: roomEdadHostSchema,
  createdAt: roomcreatedAt,
  ocupation: roomOcupationSchema,
};

module.exports = {
  roomIdSchema,
  createRoomSchema,
  updateRoomSchema,
};