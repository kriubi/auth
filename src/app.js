const express = require('express');
const app = express();
const PORT = process.env.PORT;
const CONSUMER_KEY = process.env.CONSUMER_KEY;
const CONSUMER_SECRET = process.env.CONSUMER_SECRET;
const CODE = process.env.CODE;
const VERCEL_URL = process.env.VERCEL_URL;

let access_token = null;
let refresh_token = null;
let globalCode = null;

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

app.get('/', (req, res) => {

    const { url, adm_user, store } = req.query;

    const { code, api_address, store_host } = req.query;

    let auth_callback = "http://" + VERCEL_URL + "/callback";

    return res.status(200).render('landing-page', {
        url,
        adm_user,
        store,
        code,
        api_address,
        store_host,
        CONSUMER_KEY,
        auth_callback,
    });

});

app.get('/callback', (req, res) => {

    const { url, adm_user, store } = req.query;
    
    const { code, api_address, store_host } = req.query;
    
    return res.status(200).send({
        url,
        adm_user,
        store,
        code,
        api_address,
        store_host
    });

});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
