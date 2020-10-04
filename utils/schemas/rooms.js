const joi = require('@hapi/joi');

const roomIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);

const roomNameSchema = joi.string().max(80);
const roomImagesSchema = joi.array().items(joi.string());
const roomDescriptionSchema = joi.string().max(750);
const roomWcSchema = joi.boolean();
const roomWifischema = joi.boolean();
const roomDesayunoSchema =  joi.boolean();
const roomLavanderiaSchema =  joi.boolean();
const roomTelfeonoSchema =  joi.boolean();
const roomTvSchema =  joi.boolean();
const roomDeciptionLocalSchema = joi.string();
const roomLocationSchema = joi.string().max(50);
const roomPriceSchema = joi.number().max(1000000);
const roomOcupationSchema = joi.number().max(30).min(1);
const roomIdHostSchema = joi.number();
const roomPhotoHostSchema = joi.array();
const roomNameHostSchema =joi.string();
const roomcreatedAt = joi.date();

const createRoomSchema = {
  name: roomNameSchema.required(),
  images: roomImagesSchema,
  description: roomDescriptionSchema.required(),
  Wc: roomWcSchema,
  Wifi: roomWifischema,
  Desayuno: roomDesayunoSchema,
  Lavanderia: roomLavanderiaSchema,
  Telefono: roomTelfeonoSchema,
  Tv: roomTvSchema,
  DescriptionLocal: roomDeciptionLocalSchema,
  location: roomLocationSchema.required().max(50),
  price: roomPriceSchema.required(),
  ocupation: roomOcupationSchema.required(),
  idHost: roomIdHostSchema,
  photoHost: roomPhotoHostSchema,
  nameHost: roomNameHostSchema,
  createdAt: roomcreatedAt,
};

const updateRoomSchema = {
  name: roomNameSchema,
  images: roomImagesSchema,
  description: roomDescriptionSchema,
  Wc: roomWcSchema,
  Wifi: roomWifischema,
  Desayuno: roomDesayunoSchema,
  Lavanderia: roomLavanderiaSchema,
  Telefono: roomTelfeonoSchema,
  Tv: roomTvSchema,
  DescriptionLocal: roomDeciptionLocalSchema,
  location: roomLocationSchema,
  price: roomPriceSchema,
  ocupation: roomOcupationSchema,
  idHost: roomIdHostSchema,
  photoHost: roomPhotoHostSchema,
  nameHost: roomNameHostSchema,
};


module.exports = {
  roomIdSchema,
  createRoomSchema,
  updateRoomSchema,
};