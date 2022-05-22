const { response } = require('express');
const { request } = require('express');
const express = require('express');

const app = express();
app.listen(3000, () => console.log('listening at 3000'));
app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));

app.post('/log_in', (request, response) =>{
    console.log(request.body);
    response.send({'status': 'OK'});
})