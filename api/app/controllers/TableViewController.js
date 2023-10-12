const dbConnection = require('../../database/connection');
const pformat = require('pg-format');


const getViewSelectionData = async ctx => {
    return new Promise((resolve, reject) => {
        const query = pformat(`select %I, %I, %I, %I from %I 
                             where %I in (select c.%I from %I c)`,
                             'cycleID', 'accountID', 'marketID',
                             'routeID', 'transactions', 'cycleID',
                             'cycleID', 'cycles');   
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


const getViewSelectionMaxes = async ctx => {
    return new Promise((resolve, reject) => {
        const query = pformat(`select max(%I) "maxCycleID", max(%I) "maxAccountID",
                             max(%I) "maxMarketID", max(%I) "maxRouteID" from %I 
                             where %I in (select c.%I from %I c)`,
                             'cycleID', 'accountID', 'marketID',
                             'routeID', 'transactions', 'cycleID',
                             'cycleID', 'cycles');   
        dbConnection.query(query, (error, tuples) => {
            if (error) {
              console.log("Connection error in TableViewController::getCycles", error);
              return reject(error);
            }
            ctx.body = tuples['rows'];
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in getCycles.", err);
        ctx.body = [];
        ctx.status = 500;
    });
}


module.exports = {
    getViewSelectionData,
    getViewSelectionMaxes
};
