const Authorize = require('../app/middleware/Authorize.js');
const VerifyJWT = require('../app/middleware/VerifyJWT.js');



/*
|--------------------------------------------------------------------------
| Default router
|--------------------------------------------------------------------------
|
| Default router is used to define any routes that don't belong to a
| controller. Also used as a parent container for the other routers.
|
*/
const router = require('koa-router')({
    prefix: '/api/v1'
});

router.get('/', function (ctx) {
    console.log('router.get(/)');
    return ctx.body = 'What is up?';
});


const MarketsController = require('../app/controllers/MarketsController.js');
const marketsRouter = require('koa-router') ({
  prefix: '/markets'
})

marketsRouter.use(VerifyJWT);
marketsRouter.get('/all-markets', Authorize('admin'), MarketsController.allMarkets, err => console.log(`draught_services_routes: ${err}`));
marketsRouter.get('/:marketID', Authorize('admin'), MarketsController.getMarketByMarketID, err => console.log(`draught_services_routes: ${err}`));


/**
 * Register all of the controllers into the default controller.
 */
router.use(
    '',
    marketsRouter.routes()
);

module.exports = function (app) {
    app.use(router.routes());
    app.use(router.allowedMethods());
};
