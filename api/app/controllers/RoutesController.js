const dbConnection = require('../../database/connection');
const dateFormat = require('dateformat');
const buildStudentViewFromCourses = require('../schema/buildStudentViewFromCourses');
const pformat = require('pg-format');

function now() {
    return dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
}

const allRoutes = async (ctx) => {
    console.log('routes all routes called.');
    return new Promise((resolve, reject) => {
        const query = pformat(`
                       SELECT *
                        FROM 
                            routes
                        ORDER BY %I
                        `, 'routeName');
        dbConnection.query(query, (error, tuples) => {
            if (error) {
                console.log("Connection error in RoutesController::allRoutes", error);
                return reject(error);
            }
            ctx.body = tuples['rows'];
            ctx.status = 200;
            return resolve();
        });
    }).catch(err => {
        console.log("Database connection error in allRoutes.", err);
        // The UI side will have to look for the value of status and
        // if it is not 200, act appropriately.
        ctx.body = [];
        ctx.status = 500;
    });
}

const getRouteTransactionsByRouteID = (ctx) => {
        return new Promise((resolve, reject) => {
            const query = pformat(`
                       SELECT *
                        FROM 
                            transactions 
                        WHERE 
                            %I = %L
                        `, 'routeID', ctx.params.routeID);
            dbConnection.query(query, (error, tuples) => {
                if (error) {
                    console.log("Connection error in RoutesController::getRouteTransactionsByRouteID", error);
                    ctx.body = [];
                    ctx.status = 200;
                    return reject(error);
                }
                ctx.body = tuples['rows'];
                ctx.status = 200;
                return resolve();
            });
        }).catch(err => {
            console.log("Database connection error in getRouteTransactionsByRouteID", err);
            // The UI side will have to look for the value of status and
            // if it is not 200, act appropriately.
            ctx.body = [];
            ctx.status = 500;
        });
}

module.exports = {
    allRoutes,
    getRouteTransactionsByRouteID
};
