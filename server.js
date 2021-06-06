import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;
app.use(express.static(__dirname));
app.get('/', (req, res) => {
	res.sendFile(__dirname + '/public/index.html');
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
