module.exports = function (sequelize, DataTypes) {
    var Games = sequelize.define("Games", {
        name: DataTypes.STRING,
    });
    return Games;
};

