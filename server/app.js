import express from "express";
import path from 'path';
import { fileURLToPath } from "url";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("/*", (req, res) => {
    res.sendFile(
        path.join(__dirname, "../client/dist/index.html"),
        (err) => {
            if (err) {
                res.status(500).send(err);
            }
        }
    );
});

app.listen(port, () => {
    console.log(`App is running on ${port}`);
})