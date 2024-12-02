const connect = require('./connect');

const dbQuery = async (query, params = []) => {
    try {
        const [results] = await connect.query(query, params);
        return results;
    } catch (err) {
        console.error(`Query Error: ${err.message}`);
        throw err;
    }
}
module.exports = dbQuery;