const express = require('express');
const app = express();
const PORT = process.env.PORT;
const CONSUMER_KEY = process.env.CONSUMER_KEY;
const CONSUMER_SECRET = process.env.CONSUMER_SECRET;
const CODE = process.env.CODE;
const VERCEL_URL = process.env.VERCEL_URL;

let access_token = null;
let globalCode = null;

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

app.get('/', async (req, res) => {

    const title = "/";

    const _now = new Date().toLocaleString('pt-BR', { timeZone: "America/Sao_Paulo" });

    let logInformation = "not authorized yet";

    const { url, adm_user, store } = req.query;

    const { code, api_address, store_host } = req.query;

    if (code != null) {
        globalCode = code;
    }

    let auth_callback = "http://" + VERCEL_URL + "/callback";

    if (globalCode != null) {
        let message = `${_now} - path: / - url: ${url} - adm_user: ${adm_user} - store: ${store} - code: ${code} - api_address: ${api_address} - store_host: ${store_host}`;
        logInformation = await log(message);
    }

    return res.status(200).render('landing-page', {
        title,
        url,
        adm_user,
        store,
        code,
        api_address,
        store_host,
        CONSUMER_KEY,
        auth_callback,
        logInformation
    });

});

app.get('/callback', async (req, res) => {

    const title = "/callback";

    const _now = new Date().toLocaleString('pt-BR', { timeZone: "America/Sao_Paulo" });

    let logInformation = "not authorized yet";

    const { url, adm_user, store } = req.query;

    const { code, api_address, store_host } = req.query;

    if (code != null) {
        globalCode = code;
    }

    let auth_callback = "http://" + VERCEL_URL + "/callback";

    if (globalCode != null) {
        let message = `${_now} - path: /callback - url: ${url} - adm_user: ${adm_user} - store: ${store} - code: ${code} - api_address: ${api_address} - store_host: ${store_host}`;
        logInformation = await log(message);
    }

    return res.status(200).render('landing-page', {
        title,
        url,
        adm_user,
        store,
        code,
        api_address,
        store_host,
        CONSUMER_KEY,
        auth_callback,
        logInformation
    });
});

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});

module.exports = app;

async function log(message) {

    let _token = await GetTokens();
    let _description = null;

    if (_token == null) {
        return "unable to get tokens";
    }

    const _now = new Date().toLocaleString('pt-BR', { timeZone: "America/Sao_Paulo" });
    const _mouse = `http://1039992.commercesuite.com.br/web_api/products/1?access_token=${_token}`;


    try {
        let response = await fetch(_mouse);
        _description = (await response.json()).Product.description;
    }
    catch (error) {
        return error.message;
    }

    try {
        await fetch(_mouse, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "Product": {
                    "description": _description + `<p>${_now}: ${message}</p>`,
                }
            }),
        });

        return "logged";
    }
    catch (error) {
        return "could not log";
    }
}

async function GetTokens() {
    try {
        const authEndpoint = "http://1039992.commercesuite.com.br/web_api/auth";
        const response = await fetch(authEndpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                consumer_key: CONSUMER_KEY,
                consumer_secret: CONSUMER_SECRET,
                code: globalCode,
            }),
        });
        const result = await response.json();
        return result.access_token;
    } catch (error) {
        return null;
    }
}
