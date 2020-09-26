const express = require('express');
const passport = require('passport');
const RoomsService = require('../services/Room');

const {
    roomIdSchema,
    createRoomSchema,
    updateRoomSchema,
} = require('../utils/schemas/rooms');

const validationHandler = require('../utils/middleware/validationHandler');

require('../utils/auth/strategies/jwt');

function roomsApi(app) {
    const router = express.Router();
    app.use('/api/rooms', router);

    const roomsService = new RoomsService();

    router.get('/', async function(req, res, next){
        const { tags } = req.query;
        try{
            const rooms = await roomsService.getRooms({
                tags,
            });
            
            res.status(200).json({
                data: rooms,
                message: 'Room listed',
            });
        } catch(error) {
            next(error);
        }
    });

    router.get('/search', async function (req, res, next) {
        try {
          const room = await roomsService.filterRooms(req.query);

          res.status(200).json({
            data: room,
            message: 'filtro',
          });
        } catch (err) {
          next(err);
        }
    });

    router.get('/recents', async function (req, res, next) {
        try {
          const room = await roomsService.getRomsRecents();


          res.status(200).json({
            data: room,
            message: 'recents',
          });
        } catch (err) {
          next(err);
        }
    });

    router.get(
        '/:roomId',
        validationHandler( { roomId: roomIdSchema,}, 'params'),
        async function (req, res, next) {
          const { roomId } = req.params;
          try {
            const room = await roomsService.getRoom({
              roomId,
            });
    
            res.status(200).json({
              data: room,
              message: 'Room retrieve',
            });
          } catch (err) {
            next(err);
          }
        }
    );

    router.post(
        '/',
        passport.authenticate('jwt', {
          session: false,
        }),
        validationHandler(createRoomSchema),
        async function (req, res, next) {
          const { body: room } = req;
          try {
            const createdRoomId = await roomsService.createRoom({
              room,
            });
    
            res.status(200).json({
              data: createdRoomId,
              message: 'Room created',
            });
          } catch (err) {
            next(err);
          }
        }
    );

    router.put(
        '/:roomId',
        passport.authenticate('jwt', {
          session: false,
        }),
        validationHandler( { roomId: roomIdSchema},'params'),
        validationHandler(updateRoomSchema),
        async function (req, res, next) {
          const { body: room } = req;
          const { roomId } = req.params;
          try {
            const updatedRoomId = await roomsService.updateRoom({
              roomId,
              room,
            });
    
            res.status(200).json({
              data: updatedRoomId,
              message: 'room updated',
            });
          } catch (err) {
            next(err);
          }
        }
    );

    router.delete(
        '/:roomId',
        passport.authenticate('jwt', {
          session: false,
        }),
        validationHandler({roomId: roomIdSchema,}, 'params'),
        async function (req, res, next) {
          const { roomId } = req.params;
          try {
            const deletedRoomId = await roomsService.deleteRoom({
              roomId,
            });
    
            res.status(200).json({
              data: deletedRoomId,
              message: 'Room deleted',
            });
          } catch (err) {
            next(err);
          }
        }
    );

}


module.exports = roomsApi;