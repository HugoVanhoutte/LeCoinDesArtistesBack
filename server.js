require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
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
            contact: {
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
const artistsRoutes = require('./routes/artists');
const authRoutes = require('./routes/auth');

app
    .use(cors())
    .use(bodyParser.json())
    .use(helmet())
    .use('/api/artists', artistsRoutes)
    .use('/api/auth', authRoutes)
    .use(express.static('public'))
    .listen(port, () => {
        console.log(`Server started on port: ${port}`);
    });



