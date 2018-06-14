module.exports = function (sequelize, DataTypes) {
  var Scores = sequelize.define("Scores", {
    // required
    GameName: DataTypes.STRING,
    scoreHolder: DataTypes.STRING,
    score: DataTypes.INTEGER
  });
  return Scores;
};

