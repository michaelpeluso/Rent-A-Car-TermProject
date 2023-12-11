//import dependencies
import dotenv from "dotenv";
import express from "express";
import { connectToOracle, getData, closeConnection } from "./db-manager.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

// init functions
dotenv.config();
const app = express();

// Serve static files (HTML, CSS, JS)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(path.join(__dirname, "../public")));

// API endpoint for fetching data
app.get("/data", async (req, res) => {
    try {
        const conn = await connectToOracle();
        const query = req.query.query;
        if (query) {
            const data = await getData(conn, req.query.query);
            res.json({ data });
        }
        closeConnection(conn);
    } catch (error) {
        console.error("Error fetching data:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Route for serving the HTML page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public", "index.html"));
});

// Route for serving the HTML page
app.get("/query", (req, res) => {
    res.sendFile(path.join(__dirname, "../public", "query.html"));
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`);
});
