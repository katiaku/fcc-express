require('dotenv').config();

let express = require('express');
let app = express();
let bodyParser = require('body-parser');

// solves the problem with submitting the tasks
const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');

// middleware
app.use("/", function(req, res, next) {
    let str = req.method + " " + req.path + " - " + req.ip;
    console.log(str);
    next();
});

app.get("/now", function(req, res, next) {
    req.time = new Date().toString();
    next();
}, function(req, res) {
    res.json({time: req.time});
});

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

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

app.get("/:word/echo", function(req, res) {
    const { word } = req.params;
    res.json({echo: word});
});

app.get("/name", function(req, res) {
    let firstName = req.query.first;
    let lastName = req.query.last;
    res.json({
        name: `${firstName} ${lastName}`
    });
});

app.post("/name", function(req, res) {
    let firstName = req.body.first;
    let lastName = req.body.last;
    res.json({
        name: `${firstName} ${lastName}`
    });
});

module.exports = app;
