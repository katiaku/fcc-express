let express = require('express');
let app = express();

// console.log("Hello World");

app.use(express.static(__dirname + "/public"));

app.use("/public", express.static(__dirname + "/public"));

app.get("/", function(req, res) {
    // res.send("Hello Express");
    res.sendFile(__dirname + '/views/index.html');
});


































module.exports = app;
