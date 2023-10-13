const dbConnection = require('../../database/connection');
const pformat = require('pg-format');


const allMarkets = async (ctx) => {
    console.log('/markets/all-markets called.');
    return new Promise((resolve, reject) => {
        const query = pformat(`
                       SELECT *
                        FROM 
                            markets
                        ORDER BY %I
                        `, 'marketName');
        dbConnection.query(query, (error, tuples) => {
            if (error) {
                console.log("Connection error in MarketsController::allMarkets", error);
                return reject(error);
            }
            ctx.body = tuples['rows'];
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in allMarkets.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
}

const getMarketTransactionsByMarketID = ctx => {
        return new Promise((resolve, reject) => {
            const query = pformat(`
                       SELECT *
                        FROM 
                            transactions
                        WHERE 
                            %I = %L
                        LIMIT 100
                        `, 'marketID', ctx.params.marketID);
            dbConnection.query(query, (error, tuples) => {
                if (error) {
                    console.log("Connection error in MarketsController::getMarketByMarketID", error);
                    ctx.body = [];
                    ctx.status = 200;
                    return reject(error);
                }
                ctx.body = tuples['rows'];
                ctx.status = 200;
                return resolve();
            });
        }).catch(err => {
            console.log("Database connection error in getMarketByMarketID.", err);
            // The UI side will have to look for the value of status and
            // if it is not 200, act appropriately.
            ctx.body = [];
            ctx.status = 500;
        });
}

module.exports = {
    allMarkets,
    getMarketTransactionsByMarketID
};
