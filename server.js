require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const app = express();

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Doud\'ink Server Documentation',
            version: '1.0.0',
            description: 'Documentation pour le server API du site Dou\'ink',
            constact: {
                name: 'Hugo Vanhoutte',
                email: 'hugo.vanhoutte.pro@gmail.com',
            },
            servers: [
                {rl: process.env.SERVER_URL}
            ]
        }
    },
    apis: ['./routes/*.js']
}

const port = process.env.PORT;

const swaggerDoc = swaggerJsDoc(swaggerOptions)

//Routes Paths

app
    .use(cors())
    .use(bodyParser.json())
    .use(express.static('public'))
    .listen(port, () => {
        console.log(`Server started on port: ${port}`);
    });
;


