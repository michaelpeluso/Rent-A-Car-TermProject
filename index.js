import { getConnection } from "oracledb";
import dotenv from "dotenv";
dotenv.config();

async function connectToOracle() {
    try {
        // connect to Oracle Database
        const connection = await getConnection({
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            connectionString: "(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=prophet.njit.edu)(PORT=1521))(CONNECT_DATA=(SERVER=DEDICATED)(SID=course)))",
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
