const express = require('express');
const app = express();
const PORT = process.env.PORT;
const CONSUMER_KEY = process.env.CONSUMER_KEY;
const CONSUMER_SECRET = process.env.CONSUMER_SECRET;
const CODE = process.env.CODE;

app.set('view engine', 'pug');
app.set('views', '/usr/src/app/src/views');

app.get('/', (req, res) => {
    return res.sendStatus(200);
});

app.get('/test', (req, res) => {
    return res.sendStatus(200);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
