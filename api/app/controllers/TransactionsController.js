const dbConnection = require('../../database/connection');
const dateFormat = require('dateformat');
const pformat = require('pg-format');

function now() {
    return dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
}

const getTransactions = async ctx => {
    console.log('Querying getTransaction');
    return new Promise((resolve, reject) => {
        const query = pformat(`
                        select * from %I limit %L
                        `, 'transactions', ctx.params.limit);
        dbConnection.query(query, (error, tuples) => {
            if (error) {
                console.log("Connection error in TransactionsController::getTransacations", error);
                return reject(error);
            }
            ctx.body = tuples['rows'];
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in getTransactions.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
}

const getTransactionCountPerCycle = async ctx => {
    console.log('Querying getTransactionCountPerCycle');
    return new Promise((resolve, reject) => {
        const query = pformat(`
                        select %I, count(%I) as %I
                        from %I group by %I
                        having %I = %L
                        `, 'cycleID', 'transactionID',
                        'tot_transactions', 'transactions',
                        'cycleID', 'cycleID', ctx.params.cycleID);
        dbConnection.query(query, (error, tuples) => {
            if (error) {
                console.log("Connection error in TransactionsController::getTransactionsPerCycle", error);
                return reject(error);
            }
            ctx.body = tuples['rows'];
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in getTransactionsPerCycle.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
}

const getTransactionsPerCycleByAccountID = async ctx => {
    console.log('Querying getTransactionsPerCycleByAccountID');
    return new Promise((resolve, reject) => {
        const query = pformat(`
                        select *
                        from %I group by %I, %I, %I
                        having %I = %L
                        and %I = %L
                        `, 'transactions', 'transactionID',
                        'cycleID', 'accountID',
                        'cycleID', ctx.params.cycleID,
                        'accountID', ctx.params.accountID);
        dbConnection.query(query, (error, tuples) => {
            if (error) {
                console.log("Connection error in TransactionsController::getTransactionsPerCycleByAccountID", error);
                return reject(error);
            }
            ctx.body = tuples['rows'];
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in getTransactionsPerCycleByAccountID.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
}

const getTransactionsPerCycleByRouteID = async ctx => {
    console.log('Querying getTransactionsPerCycleByRouteID');
    return new Promise((resolve, reject) => {
        const query = pformat(`
                        select *
                        from %I group by %I, %I, %I
                        having %I = %L
                        and %I = %L
                        `, 'transactions', 'transactionID',
                        'cycleID', 'routeID',
                        'cycleID', ctx.params.cycleID,
                        'routeID', ctx.params.routeID);
        dbConnection.query(query, (error, tuples) => {
            if (error) {
                console.log("Connection error in TransactionsController::getTransactionsPerCycleByRouteID", error);
                return reject(error);
            }
            ctx.body = tuples['rows'];
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in getTransactionsPerCycleByRouteID.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
}

const getTransactionsPerCycleForAllRoutes = async ctx => {
    console.log('Querying getTransactionsPerCycleForAllRoutes');
    return new Promise((resolve, reject) => {
        const query = pformat(`
                        select *
                        from %I group by %I, %I, %I
                        having %I = %L
                        `, 'transactions', 'transactionID',
                        'cycleID', 'routeID',
                        'cycleID', ctx.params.cycleID);
        dbConnection.query(query, (error, tuples) => {
            if (error) {
                console.log("Connection error in TransactionsController::getTransactionsPerCycleForAllRoutes", error);
                return reject(error);
            }
            ctx.body = tuples['rows'];
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in getTransactionsPerCycleForAllRoutes.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
}

const getTransactionsPerCycleByMarketID = async ctx => {
    console.log('Querying getTransactionsPerCycleByMarketID');
    return new Promise((resolve, reject) => {
        const query = pformat(`
                        select *
                        from %I group by %I, %I, %I
                        having %I = %L
                        and %I = %L
                        `, 'transactions', 'transactionID',
                        'cycleID', 'marketID',
                        'cycleID', ctx.params.cycleID,
                        'marketID', ctx.params.marketID);
        dbConnection.query(query, (error, tuples) => {
            if (error) {
                console.log("Connection error in TransactionsController::getTransactionsPerCycleByMarketID", error);
                return reject(error);
            }
            ctx.body = tuples['rows'];
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in getTransactionsPerCycleByMarketID.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
}


module.exports = {
    getTransactions,
    getTransactionCountPerCycle,
    getTransactionsPerCycleByAccountID,
    getTransactionsPerCycleByRouteID,
    getTransactionsPerCycleForAllRoutes,
    getTransactionsPerCycleByMarketID
};
