const propertiesReader = require('properties-reader');
const express = require('express');
const app = express();
const favicon = require('serve-favicon');
const { exec } = require("child_process");
const path = require('path')

const properties = propertiesReader('resources/app.properties');

const rootStaticDirectory = properties.get('rootDirectory') + '/src/public/';
const port = properties.get('app.port');

// Define controllers
app.get('/', (req, res) => {
    // res.send('Hello World!');
    res.sendFile(rootStaticDirectory + 'html/index.html');
})

app.get('/favicon.ico', (req, res) => {
    // res.send('Hello World!');
    res.sendFile(rootStaticDirectory + 'img/favicon.ico');
})

app.post('/screen/on', (req, res) => {
    exec("xset -display :0.0 dpms force on", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });
})

app.post('/screen/off', (req, res) => {
    exec("xset -display :0.0 dpms force off", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });
})

// Configure app
app.use(express.static(rootStaticDirectory));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
