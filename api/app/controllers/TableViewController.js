const dbConnection = require('../../database/connection');
const pformat = require('pg-format');

function validSelection(ctx) {
    if (ctx.params.selected_item.match(/(accounts)|(markets)|(routes)|(transactions)/))
        return ctx.params.selected_item;
    else return 'cycles'
}


const getViewSelectionData = async ctx => {
    return new Promise((resolve, reject) => {
        let query = '';
        if (validSelection(ctx).match(/cycles/)) {
            query = pformat('select %I from %I', 'cycleID', 'cycles');
        }
        else {
            query = pformat('select a.%I, b.%I from %I a, %I b',
                    validSelection(ctx).replace(/s$/, 'ID'),
                    'cycleID', validSelection(ctx), 'cycles');
        }   
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

/*
const getCycles = async ctx => {
    return new Promise((resolve, reject) => {
        const query = pformat('select %I from %I', 'cycleID', 'cycles');
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
*/

module.exports = {
    getViewSelectionData
};
