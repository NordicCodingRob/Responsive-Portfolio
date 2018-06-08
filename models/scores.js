module.exports = function (sequelize, DataTypes) {
  var Scores = sequelize.define("Scores", {
    // required
    gameId: DataTypes.Integer,
    scoreHolder: DataTypes.STRING,
    score: DataTypes.INTEGER
  });
  return Scores;
};

