const express = require('express');
const passport = require('passport');

const  UserRoomsService = require('../services/userRooms');
const validationHandler = require('../utils/middleware/validationHandler');

const { roomIdSchema } = require('../utils/schemas/rooms');
const { userIdSchema } = require('../utils/schemas/users');
const { createUserRoomSchema } = require('../utils/schemas/usersRooms');


require('../utils/auth/strategies/jwt');

function userRoomsApi(app) {
    const router = express.Router();
    app.use('/api/user-room', router);

    const userRoomsService = new UserRoomsService();

    router.get('/',
      passport.authenticate('jwt', { session: false }),
      validationHandler({ userId: userIdSchema }, 'query'),
      async function(req, res, next) {
        const { userId } = req.query;

        try{
            const userRoomsId = await userRoomsService.getUserRooms({ userId });

            res.status(200).json({
                data: userRoomsId,
                message: ' user bedroom listed'
            })
        } catch(error) {
            next(error);
        }
      }
    );

    router.post('/',
      passport.authenticate('jwt', { session: false }),
      validationHandler(createUserRoomSchema),
      async function(req, res, next) {
          const { body: userRoom } = req;

          try {
              const createUserRoomId = await userRoomsService.createUserRoom({ userRoom });

              res.status(201).json({
                  data: createUserRoomId,
                  message: 'user room created'
              })
          } catch(err){
              next(err);
          }
      }
    );

    router.delete('/:userRoomId',
      passport.authenticate('jwt', { session: false }),
      validationHandler({ userRoomId: roomIdSchema }, 'params'),
      async function(req, res, next) {
          const { userRoomId } = req.params;

          try{
              const deletedUserRoomId = await userRoomsService.deleteUserRoom({ userRoomId });
              
              res.status(200).json({
                  data: deletedUserRoomId,
                  message: 'user room deleted'
              })
          } catch(error){
              next(error)
          }
      }
    )
}

module.exports = userRoomsApi;