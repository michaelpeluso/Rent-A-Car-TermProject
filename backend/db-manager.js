/*
    db-manager.js
*/

//import dependencies
import { getConnection } from "oracledb";
import dotenv from "dotenv";

// init functions
dotenv.config();

// connect to Oracle Database
export async function connectToOracle() {
    try {
        // oracle credentials
        const connection = await getConnection({
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            connectionString: process.env.DB_CONN_STR,
        });
        console.log("Connected to Oracle Database");
        return connection;
    } catch (error) {
        console.error("Error connecting to Oracle: ", error.message);
        return null;
    }
}

// get data from oracle database
export async function getData(conn, query) {
    if (conn && query) {
        try {
            // request data from db
            const result = await conn.execute(query);
            console.log(result);
            const data = result.rows;
            console.log(result.rows);

            // get column names
            const columnNames = result.metaData.map((column) => column.name);

            return { data, columnNames };
        } catch (error) {
            console.log("Error retrieving data: ", error);
        }
    } else {
        if (conn) {
            console.log("Error retrieving data: query is null");
        } else {
            console.log("Error retrieving data: connection is null");
        }
    }
}

// close oracle connection
export function closeConnection(connection) {
    if (connection) {
        connection.close();
        console.log("Connection closed");
    } else {
        console.log("Error closing connection: connection is null");
    }
}

// end of file
