const dbConnection = require('../../database/connection');
const pformat = require('pg-format');


const getViewSelectionData = async ctx => {
    return new Promise((resolve, reject) => {
        const query = pformat(`select %I, %I, %I, %I from %I 
                             where %I in (select c.%I from %I c)
                             group by %I, %I, %I, %I`,
                             'cycleID', 'accountID', 'marketID',
                             'routeID', 'transactions', 'cycleID',
                             'cycleID', 'cycles', 'cycleID',
                             'accountID', 'marketID', 'routeID');   
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
        const query = pformat(`select max(t.%I) "cycleID", max(t.%I) "accountID",
                             max(t.%I) "marketID", max(t.%I) "routeID" from %I t
                             where t.%I in (select c.%I from %I c)
                             group by t.%I, t.%I, t.%I, t.%I`,
                             'cycleID', 'accountID', 'marketID',
                             'routeID', 'transactions', 'cycleID',
                             'cycleID', 'cycles', 'cycleID',
                             'accountID', 'marketID', 'routeID');   
        dbConnection.query(query, (error, tuples) => {
            if (error) {
              console.log("Connection error in TableViewController::getViewSelectionMaxes", error);
              return reject(error);
            }
            ctx.body = tuples['rows'];
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in getViewSelectionMaxes", err);
        ctx.body = [];
        ctx.status = 500;
    });
}


module.exports = {
    getViewSelectionData,
    getViewSelectionMaxes
};
