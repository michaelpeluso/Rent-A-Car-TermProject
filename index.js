const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
require("dotenv").config();

async function run() {
    let connection;

    try {
        // Establish a connection to the Oracle database
        connection = await oracledb.getConnection({
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            connectString: process.env.DB_CONNECTION_STRING,
        });

        // Execute SQL queries or operations here
        const result = await connection.execute("SELECT * FROM your_table");

        console.log("Query Result:", result.rows);
    } catch (error) {
        console.error("Error connecting to Oracle:", error);
    } finally {
        // Release the Oracle connection
        if (connection) {
            try {
                await connection.close();
                console.log("Connection closed");
            } catch (error) {
                console.error("Error closing connection:", error);
            }
        }
    }
}

// Run the script
run();
