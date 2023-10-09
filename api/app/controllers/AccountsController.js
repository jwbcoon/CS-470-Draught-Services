
const dbConnection = require('../../database/connection');
const pformat = require('pg-format');


const allAccounts = async (ctx) => {
    console.log('/accounts/all-accounts called.');
    return new Promise((resolve, reject) => {
        const query = pformat(`
                       SELECT *
                        FROM 
                            accounts
                        ORDER BY %I
                        `, 'accountName');
        dbConnection.query(query, (error, tuples) => {
            if (error) {
                console.log("Connection error in AccountsController::allAccounts", error);
                return reject(error);
            }
            ctx.body = tuples['rows'];
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in allAccounts.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
}

const getAccountByAccountID = (ctx) => {
        return new Promise((resolve, reject) => {
            const query = pformat(`
                       SELECT *
                        FROM 
                            accounts
                        WHERE 
                            %I = %L
                        ORDER BY %I
                        `, 'accountID', ctx.params.accountID, 'accountName');
            dbConnection.query(query, (error, tuples) => {
                if (error) {
                    console.log("Connection error in AccountsController::getAccountByAccountID", error);
                    ctx.body = [];
                    ctx.status = 200;
                    return reject(error);
                }
                ctx.body = tuples;
                ctx.status = 200;
                return resolve();
            });
        }).catch(err => {
            console.log("Database connection error in getAccountByAccountID.", err);
            // The UI side will have to look for the value of status and
            // if it is not 200, act appropriately.
            ctx.body = [];
            ctx.status = 500;
        });
}

module.exports = {
    allAccounts,
    getAccountByAccountID
};

