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

/*
|--------------------------------------------------------------------------
| login router
|--------------------------------------------------------------------------
|
| Description
|
*/

// Login router configuration.

const LoginController = require('../app/controllers/LoginController.js');
const loginRouter = require('koa-router')({
    prefix: '/login'
});
loginRouter.get('/:user_id', LoginController.authorizeUser, (err) => console.log("draught_services_routes.js: login-route error:", err));


const TableViewController = require('../app/controllers/TableViewController.js');
const tableViewRouter = require('koa-router') ({
    prefix: '/view-update'
});

tableViewRouter.use(VerifyJWT);
tableViewRouter.get('/:selected_item', Authorize('admin'), TableViewController.getViewSelectionData, err => console.log(`draught_services_routes.js: ${err}`));


const MarketsController = require('../app/controllers/MarketsController.js');
const marketsRouter = require('koa-router') ({
  prefix: '/markets'
})

marketsRouter.use(VerifyJWT);
marketsRouter.get('/all-markets', Authorize('admin'), MarketsController.allMarkets, err => console.log(`draught_services_routes: ${err}`));
marketsRouter.get('/:marketID', Authorize('admin'), MarketsController.getMarketByMarketID, err => console.log(`draught_services_routes: ${err}`));


// Routes router configuration.


const RoutesController = require('../app/controllers/RoutesController.js');
const routesRouter = require('koa-router')({
    prefix: '/routes'
});

routesRouter.use(VerifyJWT);
routesRouter.get('/all-routes', Authorize('admin'), RoutesController.allRoutes, err => console.log(`allRoutes ran into an error: ${err}`));
routesRouter.get('/:routeID/', Authorize('admin'), RoutesController.routeWithRouteID);


const AccountsController = require('../app/controllers/AccountsController.js');
const accountsRouter = require('koa-router') ({
  prefix: '/accounts'
})

accountsRouter.use(VerifyJWT);
accountsRouter.get('/all-accounts', Authorize('admin'), AccountsController.allAccounts, err => console.log(`draught_services_routes: ${err}`));
accountsRouter.get('/:accountID', Authorize('admin'), AccountsController.getAccountByAccountID, err => console.log(`draught_services_routes: ${err}`));


const TransactionsController = require('../app/controllers/TransactionsController.js');
const transRouter = require('koa-router') ({
    prefix: '/transactions'
});

transRouter.use(VerifyJWT);
transRouter.get('/:cycleID', Authorize('admin'), TransactionsController.getTransactionCountPerCycle, (err) => console.log(`draught_services_routes.js: ${err}`)); 
transRouter.get('/:cycleID/:accountID/one-account', Authorize('admin'), 
    TransactionsController.getTransactionsPerCycleByAccountID, (err) => console.log(`draught_services_routes.js: ${err}`)); 
transRouter.get('/:cycleID/:routeID/trans-for-route', Authorize('admin'), 
    TransactionsController.getTransactionsPerCycleByRouteID, (err) => console.log(`draught_services_routes.js: ${err}`)); 
transRouter.get('/:cycleID/all-routes', Authorize('admin'), TransactionsController.getTransactionsPerCycleForAllRoutes, (err) => console.log(`draught_services_routes.js: ${err}`)); 
transRouter.get('/:cycleID/:marketID/trans-for-market', Authorize('admin'), TransactionsController.getTransactionsPerCycleByMarketID, (err) => console.log(`draught_services_routes.js: ${err}`)); 

/**
 * Register all of the controllers into the default controller.
 */
router.use(
    '',
    loginRouter.routes(),
    tableViewRouter.routes(),
    marketsRouter.routes(),
    routesRouter.routes(),
    accountsRouter.routes(),
    transRouter.routes()
);

module.exports = function (app) {
    app.use(router.routes());
    app.use(router.allowedMethods());
};
