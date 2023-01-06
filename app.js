require('dotenv').config();
const port = process.env.PORT || 4000;
const express = require("express");
const customCors = require('./cors')
const path = require("path");
const routes = require("./router");

const app = express();
app.options("*", customCors); //run preflight req through custom cors middleware
app.use(customCors);

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

routes(app);

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));

