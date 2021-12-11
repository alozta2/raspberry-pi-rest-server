const propertiesReader = require('properties-reader');
const express = require('express');
const app = express();
const favicon = require('serve-favicon');

const properties = propertiesReader('resources/app.properties');

const rootStaticDirectory = properties.get('rootDirectory') + '/src/static/';
const port = properties.get('app.port');

// Define controllers
app.get('/', (req, res) => {
    // res.send('Hello World!');
    res.sendFile(rootStaticDirectory + 'html/index.html');
})

// Configure app
app.use(favicon(rootStaticDirectory + 'img/favicon.ico'));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
