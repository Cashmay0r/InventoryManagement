import express from 'express';
import ejs from 'ejs';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
	res.sendFile('C:/Users/Aidan/Documents/Projects/InventoryManagement/public/index.html');
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
