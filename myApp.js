let express = require('express');
let app = express();

const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');

app.use("/", function(req, res, next) {
    let str = req.method + " " + req.path + " - " + req.ip;
    console.log(str);
    next();
});

require('dotenv').config();

// console.log("Hello World");

app.use(express.static(__dirname + "/public"));

app.use("/public", express.static(__dirname + "/public"));

app.get("/", function(req, res) {
    // res.send("Hello Express");
    res.sendFile(__dirname + '/views/index.html');
});

app.get("/json", (req, res) => {
    let response = {"message": "Hello json"};

    if (process.env.MESSAGE_STYLE === "uppercase") {
        response.message = response.message.toUpperCase();
        res.json(response);
    } else {
        res.json(response);
    }
});

module.exports = app;
