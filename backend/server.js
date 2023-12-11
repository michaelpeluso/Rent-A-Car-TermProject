import express from "express";
import dotenv from "dotenv";
import connectToOracle from "./index.js";

const app = express();
dotenv.config();

app.get("/", async (req, res) => {
    try {
        connectToOracle();

        res.json({ data: "Your data from Oracle database" });
    } catch (error) {
        console.error("Error fetching data:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`);
});
