const { response } = require('express');
const { request } = require('express');
const express = require('express');
const app = express();

const Datastore = require('nedb');
const database = new Datastore('datastore.db');
database.loadDatabase();

app.listen(3000, () => console.log('listening at 3000'));
app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));

app.post('/log_in', (request, response) =>{
    console.log(`${request.body['email']} logged in`)
    response.send({'status': 'OK'});
})

app.post('/register', (request, response) =>{  
    console.log(`${request.body['email']} registered`)
    response.send({'status': 'OK'});
})