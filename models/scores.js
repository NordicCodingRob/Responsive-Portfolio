module.exports = function (sequelize, DataTypes) {
  var Scores = sequelize.define("Scores", {
    // required
    gameId: DataTypes.INTEGER,
    scoreHolder: DataTypes.STRING,
    score: DataTypes.INTEGER
  });
  return Scores;
};

