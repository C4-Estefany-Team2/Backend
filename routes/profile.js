const express = require('express');
const passport = require('passport');
const  PerfilesService = require('../services/profile');


const {
    createPerfileSchema,
    updatePerfileSchema,
    perfileIdSchema,
} = require('../utils/schemas/profiles');

const validationHandler = require('../utils/middleware/validationHandler');

require('../utils/auth/strategies/jwt');


function perfilesApi(app) {
    const router = express.Router();
    app.use('/api/perfiles', router);

    const perfilesService = new PerfilesService();

    router.get('/', async function(req, res, next){
        const { tags } = req.query;
        try{
            const perfiles = await perfilesService.getPerfiles({
                tags,
            });
            
            res.status(200).json({
                data: perfiles,
                message: 'perfil listed',
            });
        } catch(error) {
            next(error);
        }
    });

    router.get('/search', async function (req, res, next) {
        try {
          const perfil = await perfilesService.filterPerfiles(req.query);

          res.status(200).json({
            data: perfil,
            message: 'filtro',
          });
        } catch (err) {
          next(err);
        }
    });

    router.get('/recents', async function (req, res, next) {
        try {
          const perfil = await perfilesService.getPerfilesRecents();


          res.status(200).json({
            data: perfil,
            message: 'recents',
          });
        } catch (err) {
          next(err);
        }
    });

    router.get(
        '/:perfileId',
        validationHandler( { perfilId: perfileIdSchema,}, 'params'),
        async function (req, res, next) {
          const { perfilId } = req.params;
          try {
            const perfil = await perfilesService.getPerfiles({
              perfilId,
            });
    
            res.status(200).json({
              data: perfil,
              message: 'Perfil retrieve',
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
        validationHandler(createPerfileSchema),
        async function (req, res, next) {
          const { body: perfile } = req;
          try {
            const createdPerfileId = await perfilesService.createPerfile({
              perfile,
            });
    
            res.status(200).json({
              data: createdPerfileId,
              message: 'Perfil created',
            });
          } catch (err) {
            next(err);
          }
        }
    );

    router.put(
        '/:perfilId',
        passport.authenticate('jwt', {
          session: false,
        }),
        validationHandler( { perfilId: perfileIdSchema},'params'),
        validationHandler(updatePerfileSchema),
        async function (req, res, next) {
          const { body: perfil } = req;
          const { perfilId } = req.params;
          try {
            const updatedPerfilId = await perfilesService.updatePerfile({
              perfilId,
              perfil,
            });
    
            res.status(200).json({
              data: updatedPerfilId,
              message: 'perfil updated',
            });
          } catch (err) {
            next(err);
          }
        }
    );

    router.delete(
        '/:perfilId',
        passport.authenticate('jwt', {
          session: false,
        }),
        validationHandler({perfilId: perfileIdSchema,}, 'params'),
        async function (req, res, next) {
          const { perfilId } = req.params;
          try {
            const deletedPerfilId = await perfilesService.deletePerfile({
              perfilId,
            });
    
            res.status(200).json({
              data: deletedPerfilId,
              message: 'Perfil deleted',
            });
          } catch (err) {
            next(err);
          }
        }
    );

}

module.exports = perfilesApi;