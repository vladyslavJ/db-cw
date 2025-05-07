import express from 'express';
import path from 'path';
import router from './src/routes/table.routes.js';

const app = express();

app.use(express.json());
app.use(express.static(path.join(path.resolve(), 'public')));

app.use('/', router);

app.get('/', (req, res) => {
	res.sendFile(path.join(path.resolve(), 'public/html/railway.html'));
});

app.get('/about', (req, res) => {
	res.sendFile(path.join(path.resolve(), 'public/html/about.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(
		`Server running on port http://localhost:${PORT}`
	);
});
