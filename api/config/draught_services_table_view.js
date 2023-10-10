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


const TableViewController = require('../app/controllers/TableViewController.js');
const tableViewRouter = require('koa-router') ({
    prefix: '/view-update'
});

tableViewRouter.use(VerifyJWT);
tableViewRouter.get('/:selected_item', Authorize('admin'), TableViewController.getViewSelectionData, err => console.log(`draught_services_routes.js: ${err}`));



/**
 * Register all of the controllers into the default controller.
 */
router.use(
    '',
    tableViewRouter.routes()
);

module.exports = function (app) {
    app.use(router.routes());
    app.use(router.allowedMethods());
};
