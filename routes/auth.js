const express = require('express');
const passport = require('passport');
const boom = require('@hapi/boom');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const ApiKeysService = require('../services/apiKeys');
const UserService = require('../services/users');
const validationHandler = require('../utils/middleware/validationHandler');

const { createUserSchema } = require('../utils/schemas/users');

const { config } = require('../config');


// Basic strategy
require('../utils/auth/strategies/basic');

function authApi(app) {
  const router = express.Router();
  app.use('/api/auth', router);

  const apiKeysService = new ApiKeysService();
  const usersService = new UserService()

  router.post('/sign-in', async function(req, res, next) {
    const { apiKeyToken } = req.body;

    if (!apiKeyToken) {
      next(boom.unauthorized('apiKeyToken is required'));
    }

    passport.authenticate('basic', function(error, user) {
      
      try {
        if (error || !user) {
          next(boom.unauthorized());
        }

        req.login(user, { session: false }, async function(error) {
          if (error) {
            next(error);
          }

          const apiKey = await apiKeysService.getApiKey({ token: apiKeyToken });

          if (!apiKey) {
            next(boom.unauthorized());
          }

          const { _id: id, name, email, data, phone } = user;

          const payload = {
            sub: id,
            name,
            email,
            data,
            phone,
            scopes: apiKey.scopes
          };

          const token = jwt.sign(payload, config.authJwtSecret, {
            expiresIn: '120m'
          });

          return res.status(200).json({ token, user: { id, name, email, data, phone } });
        });
      } catch (error) {
        next(error);
      }
    })(req, res, next);
  });



  router.post('/sign-up', validationHandler(createUserSchema), async function(req, res, next) {
     const { body: user, apiKeyToken } = req;

     if (!apiKeyToken) {
      next(boom.unauthorized('apiKeyToken is required'));
     }

     try{

      const apiKey = await apiKeysService.getApiKey({ token: apiKeyToken });

      if (!apiKey) {
        next(boom.unauthorized());
      }

      const token = jwt.sign(payload, config.authJwtSecret, {
        expiresIn: '120m'
      });
      const createdUserId = await usersService.createUser({ user });
        res.status(201).json({
          token,
          data: createdUserId,
          message: 'user created'
        })
        
     }catch(error) {
       next(error);
     }
  })
}

module.exports = authApi;