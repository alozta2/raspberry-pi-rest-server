const propertiesReader = require('properties-reader');
const express = require('express');
const app = express();
const { exec } = require("child_process");

const properties = propertiesReader('resources/app.properties');

const rootStaticDirectory = properties.get('rootDirectory') + '/src/public/';
const port = properties.get('app.port');

// Define controllers
app.get('/', (req, res) => {
    res.sendFile(rootStaticDirectory + 'html/index.html');
})

app.get('/favicon.ico', (req, res) => {
    res.sendFile(rootStaticDirectory + 'img/favicon.ico');
})

app.post('/screen/on', (req, res) => {
    execSync("xset -display :0.0 dpms force on", execOptions, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
        }
    });
    return {delay: 10000};
})

app.post('/screen/off', (req, res) => {
    execSync("xset -display :0.0 dpms force off", execOptions, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
        }
    });
    return {delay: 10000};
})

// Configure app
app.use(express.static(rootStaticDirectory));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

const execOptions = {
    timeout: 20000,
}
