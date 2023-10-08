const dbConnection = require('../../database/connection');
const pformat = require('pg-format');

function validSelection(ctx) {
    if (ctx.params.accounts)
      return ctx.params.accounts;
    if (ctx.params.markets)
      return ctx.params.markets;
    if (ctx.params.routes)
      return ctx.params.routes;
    if (ctx.params.transactions)
      return ctx.params.transactions;
}


const getViewSelectionData = async ctx => {
    console.log(validSelection(ctx).replace(/s$/, 'ID'));
    return new Promise((resolve, reject) => {
        const query = pformat('select %I from %I', validSelection(ctx).replace(/s$/, 'ID'), validSelection(ctx));
        dbConnection.query(query, (error, tuples) => {
            if (error) {
                console.log("Connection error in TableViewController::getViewSelectionData", error);
                return reject(error);
            }
            ctx.body = tuples['rows'];
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in getViewSelectionData.", err);
        ctx.body = [];
        ctx.status = 500;
    });
}

module.exports = {
    getViewSelectionData
};
