var path = require("path");


// Routes
module.exports = function (app) {

    app.get("/", function (req, res) {
        res.render("index");
    });

    app.get("/aboutus", function (req, res) {
        res.render("aboutUs");
    });

    app.get("/upload", function (req, res) {
        res.render("upload");
    });

};