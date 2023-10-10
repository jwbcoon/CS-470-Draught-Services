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


const AccountsController = require('../app/controllers/AccountsController.js');
const accountsRouter = require('koa-router') ({
  prefix: '/accounts'
})

accountsRouter.use(VerifyJWT);
accountsRouter.get('/all-accounts', Authorize('admin'), AccountsController.allAccounts, err => console.log(`draught_services_routes: ${err}`));
accountsRouter.get('/:accountID', Authorize('admin'), AccountsController.getAccountByAccountID, err => console.log(`draught_services_routes: ${err}`));


/**
 * Register all of the controllers into the default controller.
 */
router.use(
    '',
    accountsRouter.routes()
);

module.exports = function (app) {
    app.use(router.routes());
    app.use(router.allowedMethods());
};
