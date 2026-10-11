const express = require("express");
const mongoose = require("mongoose");
const i18next = require("i18next");
const backend = require("i18next-fs-backend");
const middleware = require("i18next-http-middleware");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;
const api = process.env.API;
const connectionString = process.env.CONNECT_STRING;

i18next
    .use(backend)
    .use(middleware.LanguageDetector)
    .init({
        fallbackLng:  "en",
        backend: {
            loadPath: "locales/{{lng}}.json"
        }
    })

app.use(middleware.handle(i18next));


app.get(`${api}/health`, (req, res) => {
    res.send(req.t("testMsg"))
});

mongoose
    .connect(connectionString)
    .then(() => {
        console.log("DB connected successfully!")
    })
    .catch((error) => {
        console.log(error);
    })

app.listen(port, () => {
    console.log(`server is running http://localhost:${port}`);
});
