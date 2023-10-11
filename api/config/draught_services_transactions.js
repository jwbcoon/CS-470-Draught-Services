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


const TransactionsController = require('../app/controllers/TransactionsController.js');
const transRouter = require('koa-router') ({
    prefix: '/transactions'
});

transRouter.use(VerifyJWT);
transRouter.get('/:limit/all-transactions', Authorize('admin'), TransactionsController.getTransactions, err => console.log(`draught_services_transactions.js: ${err}`))
transRouter.get('/:cycleID', Authorize('admin'), TransactionsController.getTransactionCountPerCycle, err => console.log(`draught_services_transactions.js: ${err}`)); 
transRouter.get('/:cycleID/:accountID/one-account', Authorize('admin'), 
    TransactionsController.getTransactionsPerCycleByAccountID, err => console.log(`draught_services_transactions.js: ${err}`)); 
transRouter.get('/:cycleID/:routeID/trans-for-route', Authorize('admin'), 
    TransactionsController.getTransactionsPerCycleByRouteID, err => console.log(`draught_services_transactions.js: ${err}`)); 
transRouter.get('/:cycleID/all-routes', Authorize('admin'), TransactionsController.getTransactionsPerCycleForAllRoutes, err => console.log(`draught_services_transactions.js: ${err}`)); 
transRouter.get('/:cycleID/:marketID/trans-for-market', Authorize('admin'), TransactionsController.getTransactionsPerCycleByMarketID, err => console.log(`draught_services_transactions.js: ${err}`)); 


/**
 * Register all of the controllers into the default controller.
 */
router.use(
    '',
    transRouter.routes()
);

module.exports = function (app) {
    app.use(router.routes());
    app.use(router.allowedMethods());
};
