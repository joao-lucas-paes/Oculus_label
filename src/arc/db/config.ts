import knex from 'knex';
import { DB_PATH, DB_DRIVER } from '../../const/arc';

/**
 * Creates a database connection using the specified client and filename.
 * @param {string} client - The database client to use (default is DB_DRIVER).
 * @param {string} filename - The path to the database file (default is DB_PATH).
 * @returns {knex.Knex} - A Knex instance connected to the database.
 */
function createDBConnection(client: string=DB_DRIVER, filename: string=DB_PATH) {
    return knex({client:client, connection:{filename:filename}, useNullAsDefault:true});
}

/**
 * Gets the default database connection.
 * @returns {knex.Knex} - A Knex instance connected to the default database.
 */
function getDefaultDBConnection() {
    return createDBConnection();
}

/** * Closes the database connection.
 * @param {knex.Knex} dbConnection - The Knex instance to close.
 * @returns {Promise<void>} - A promise that resolves when the connection is closed.
 */
async function closeDBConnection(dbConnection: knex.Knex) {
    return dbConnection.destroy();
}

