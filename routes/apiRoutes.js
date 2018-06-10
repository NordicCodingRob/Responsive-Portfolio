// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function (app) {

    // GET route for getting all of the posts
    app.get("/api/games", function (req, res) {
        db.Games.findAll().then(function (games) {
            res.json(games);
        });
    });

    app.get("/api/games/:gameId", function (req, res) {
        var query = { gameId: req.parmas.gameId };


        db.Scores.findAll({
            where: query,
            order: [
                [sequelize.fn('max', sequelize.col('score')), 'DESC']
            ],
            limit: 10
        }).then(function (scores) {
            res.json(scores);
        });
    });


    app.get("/api/scores", function (req, res) {
        db.Scores.findAll().then(function (Scores) {
            res.json(Scores);
        });
    });


    // POST route for saving a new post
    app.post("/api/scores", function (req, res) {
        // required to have gameId
        db.Scores.create(req.body).then(function (score) {
            res.json(score);
        });
    });

    app.put("/api/scores", function (req, res) {
        db.Scores.update(
            req.body,
            {
                where: {
                    id: req.body.id
                }
            }).then(function (scores) {
                res.json(scores)
            });
    });

};
