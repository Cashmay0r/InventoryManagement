import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(__dirname + "/public/"));
app.use(express.static(__dirname + "/public/html/"));
app.use(express.static(__dirname + "/public/css/"));
app.use(express.static(__dirname + "/public/js/"));

app.get("/", (req, res) => {
  res.send("Login Page");
  res.sendFile(__dirname + "/public/html/index.html");
});

app.listen(port, () => {
  console.log(`Server Listening at http://localhost:${port}`);
});
