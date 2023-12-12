/*
    server.js
*/

//import dependencies
import dotenv from "dotenv";
import express from "express";
import { connectToOracle, getData, closeConnection } from "./db-manager.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

// init functions
dotenv.config();
const app = express();
let dataLog = [];

// Serve static files (HTML, CSS, JS)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(path.join(__dirname, "../public")));

// API endpoint for fetching data
app.get("/data", async (req, res) => {
    try {
        // attempt connection to oracle
        const conn = await connectToOracle();
        const query = req.query.query;

        // serve query
        if (query) {
            const data = await getData(conn, req.query.query);

            res.json({ data }); // return data

            // store data in data log
            dataLog.push({
                timestamp: new Date().toISOString(),
                query: req.query.query,
                data: JSON.stringify(data, null, 2),
            });
        }

        // close connection
        closeConnection(conn);
    } catch (error) {
        console.error("Error fetching data:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Route for serving the HTML page
const tableRoutes = ["agrees", "credit-card", "class", "customer", "location", "makes", "model", "rental-agreement", "reservation", "vehicle"];
tableRoutes.forEach((route) => {
    app.get(`/view-${route}`, (req, res) => {
        res.sendFile(path.join(__dirname, "../public", "view-table.html"));
    });
});

app.get("/admin", (req, res) => {
    res.sendFile(path.join(__dirname, "../public", "admin.html"));
});

app.get("/data-log", (req, res) => {
    res.json({ dataLog });
});

app.get("/log", (req, res) => {
    res.sendFile(path.join(__dirname, "../public", "log.html"));
});

// listen for updates
app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`);
});

// end of file
