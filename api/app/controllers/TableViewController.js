const dbConnection = require('../../database/connection');
const dateFormat = require('dateformat');
const pformat = require('pg-format');

function now() {
    return dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
}


const getSummary = async ctx => {
    return null;
    /*return new Promise((resolve, reject) => {
        const query = '';
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
    });*/
}

const getTransactionCPCView = async ctx => {
    return new Promise((resolve, reject) => {
        const query = pformat('\\d %I', 'transactions');
        dbConnection.query(query, (error, tuples) => {
            if (error) {
                console.log("Connection error in TableViewControoler::getTransactionCPCView", error);
                return reject(error);
            }
            ctx.body = tuples['rows'];
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in getTransactionCPCView.", err);
        ctx.body = [];
        ctx.status = 500;
    });
}

module.exports = {
    getSummary,
    getTransactionCPCView
};
