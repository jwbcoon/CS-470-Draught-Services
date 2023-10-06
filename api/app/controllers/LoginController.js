const dbConnection = require('../../database/connection');
const setAccessToken = require('../../config/setAccessToken');
const qformat = require('pg-format');


require('dotenv').config();

const authorizeUser = async (ctx) => {
        return new Promise((resolve, reject) => {

	    // Right up here, you could inspect the provided uers_id to
	    // make sure that it is, at the surface, a legitimate ID.
	    // For example, if user ids are suppose to be email addresses,
	    // you can at least make sure that user's input is consistent
	    // with the format of email addresses. 
	    
            let query = qformat("SELECT * FROM scheduler_users WHERE user_id = %L", ctx.params.user_id);
            dbConnection.query(query, (error, tuples) => {
                    if (error) {
                        console.log("Query error.", error);
                        return reject(`Query error. Error msg: error`);
                    }
                    if (tuples['rows'].length === 1) {  // Did we have a matching user record?
                        setAccessToken(ctx, tuples['rows'][0]);
                        console.log('from studentRecord. About to return ', tuples['rows'][0]);
                        ctx.body = {
                            status: "OK",
                            user: tuples['rows'],
                        };
                    } else {
                        console.log('Not able to identify the user.');
			            return reject('No such user.');
                    }
                    return resolve();
                })
        });
};


module.exports = {
    authorizeUser,
};
