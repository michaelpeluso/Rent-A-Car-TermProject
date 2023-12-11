import { getConnection } from "oracledb";
import dotenv from "dotenv";
dotenv.config();

async function connectToOracle() {
    try {
        // connect to Oracle Database
        const connection = await getConnection({
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            connectionString: process.env.DB_CONN_STR,
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

// export function to server
export default connectToOracle;
