const express = require('express');
const passport = require('passport');

const  UserPefilesService = require('../services/userPerfiles');
const validationHandler = require('../utils/middleware/validationHandler');

const { perfileIdSchema } = require('../utils/schemas/profiles');
const { userIdSchema } = require('../utils/schemas/users');
const { createUserPerfileSchema } = require('../utils/schemas/userPerfiles');


require('../utils/auth/strategies/jwt');

function userPerfileApi(app) {
    const router = express.Router();
    app.use('/api/user-perfil', router);

    const userPerfileService = new UserPefilesService();

    router.get('/',
      passport.authenticate('jwt', { session: false }),
      validationHandler({ userId: userIdSchema }, 'query'),
      async function(req, res, next) {
        const { userId } = req.query;

        try{
            const userPerfileId = await userPerfileService.getUserRooms({ userId });

            res.status(200).json({
                data: userPerfileId,
                message: ' user perfiles listed'
            })
        } catch(error) {
            next(error);
        }
      }
    );

    router.post('/',
      passport.authenticate('jwt', { session: false }),
      validationHandler(createUserPerfileSchema),
      async function(req, res, next) {
          const { body: userPerfil } = req;

          try {
              const createUserPerfilId = await userPerfileService.createUserRoom({ userPerfil });

              res.status(201).json({
                  data: createUserPerfilId ,
                  message: 'user perfil created'
              })
          } catch(err){
              next(err);
          }
      }
    );

    router.delete('/:userRoomId',
      passport.authenticate('jwt', { session: false }),
      validationHandler({ userPerfileId: perfileIdSchema }, 'params'),
      async function(req, res, next) {
          const { userPerfileId } = req.params;

          try{
              const deletedUserPerfileId = await userPerfileService.deleteUserRoom({ userPerfileId });
              
              res.status(200).json({
                  data: deletedUserPerfileId,
                  message: 'user room deleted'
              })
          } catch(error){
              next(error)
          }
      }
    )
}

module.exports =  userPerfileApi;