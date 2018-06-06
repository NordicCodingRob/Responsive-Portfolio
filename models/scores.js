module.exports = function (sequelize, DataTypes) {
  var Scores = sequelize.define("Scores", {
    gameName: DataTypes.STRING,
    scoreHolder: DataTypes.STRING,
    highScore: DataTypes.INTEGER
  });
  return Scores;
};
