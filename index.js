import { getConnection } from "oracledb";
import dotenv from "dotenv";
dotenv.config();

async function oracleRequest() {
    const connection = await getConnection({
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        connectString: process.env.DB_CONNECTION_STRING,
    });

    connection.connect((err, result) => {
        if (err) {
            console.log(err);
            return;
        }

        const sql = "SELECT * FROM employees";

        connection.query(sql, (err, result) => {
            if (err) {
                console.log(err);
                return;
            }

            console.log(result.rows);

            connection.close((err, result) => {
                if (err) {
                    console.log(err);
                    return;
                }
            });
        });
    });
}

oracleRequest();
