/*
import { getConnection } from "oracledb";
import dotenv from "dotenv";
dotenv.config();
*/
const oracledb = require("oracledb");
require("dotenv").config();

async function connectToOracle() {
    try {
        // connect to Oracle Database
        const connection = await getConnection({
            /*
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            connectionString: "(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=prophet.njit.edu)(PORT=1521))(CONNECT_DATA=(SERVER=DEDICATED)(SID=course)))",*/
            user: DB_USER,
            password: DB_PASSWORD,
            connectionString: DB_CONN_STR,
        });
        console.log("Connected to Oracle Database");

        // database operations

        // Release connection
        await connection.close();
        console.log("Connection closed");
    } catch (error) {
        console.error("Error connecting to Oracle:", error.message);
    }
}

// Run the connection function
connectToOracle();
