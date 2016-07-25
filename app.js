var express = require('express');
var app = express();
var port = process.env.PORT || 3001;

app.use(express.static(__dirname + '/public'));

app.listen(port);
console.log("Server is live and listening on port " + port);
