const dbConnection = require('../../database/connection');
const pformat = require('pg-format');

function validSelection(ctx) {
    if (ctx.params.selected_item.match(/(accounts)|(markets)|(routes)|(transactions)/))
        return ctx.params.selected_item;
}


const getViewSelectionData = async ctx => {
    return new Promise((resolve, reject) => {
        const query = pformat('select * from %I LIMIT 30', /*validSelection(ctx).replace(/s$/, 'ID'),*/ validSelection(ctx));
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
