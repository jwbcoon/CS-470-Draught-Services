
const dbConnection = require('../../database/connection');
const pformat = require('pg-format');


const allAccounts = async (ctx) => {
    console.log('/accounts/all-accounts called.');
    return new Promise((resolve, reject) => {
        const query = pformat(`
                       SELECT *
                        FROM 
                            accounts
                        ORDER BY %I LIMIT 1000
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

const getAccountTransactionsByAccountID = (ctx) => {
        return new Promise((resolve, reject) => {
            const query = pformat(`
                       SELECT *
                        FROM 
                            transactions
                        WHERE 
                            %I = %L
                        `, 'accountID', ctx.params.accountID);
            dbConnection.query(query, (error, tuples) => {
                if (error) {
                    console.log("Connection error in AccountsController::getAccountTransactionsByAccountID", error);
                    ctx.body = [];
                    ctx.status = 200;
                    return reject(error);
                }
                ctx.body = tuples['rows'];
                ctx.status = 200;
                return resolve();
            });
        }).catch(err => {
            console.log("Database connection error in getAccountTransactionsByAccountID", err);
            // The UI side will have to look for the value of status and
            // if it is not 200, act appropriately.
            ctx.body = [];
            ctx.status = 500;
        });
}

module.exports = {
    allAccounts,
    getAccountTransactionsByAccountID
};

