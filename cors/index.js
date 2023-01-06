const cors = require('cors');
require('dotenv').config();

//modify frontend origin in .env as needed
const corsOptions = {
    origin: process.env.ORIGIN,
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}

module.exports = cors(corsOptions);