const dbConfig = require("../config/db.config.js"); // 引入資料庫連結設定檔

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, { // 由資料庫連結設定檔的設定值來備置 Sequelize
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

//checking if connection is done
sequelize.authenticate().then(() => {
    console.log(`Database connected to discover~`)
}).catch((err) => {
    console.log(err)
})

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./user.model.js")(sequelize, DataTypes);
db.Profile = require("./profile.model.js")(sequelize, DataTypes);
db.UserProfile = require("./userProfile.model.js")(sequelize, DataTypes);
db.Activity = require("./activity.model.js")(sequelize, DataTypes);
db.Group = require("./group.model.js")(sequelize, DataTypes);
db.ActivityGroup = require("./activityGroup.model.js")(sequelize, DataTypes);
db.UserActivityGroup = require("./userActivityGroup.model.js")(sequelize, DataTypes);
db.Part = require("./part.model.js")(sequelize, DataTypes);
db.ActivityPart = require("./activityPart.model.js")(sequelize, DataTypes);
db.SubPart = require("./subPart.model.js")(sequelize, DataTypes);
db.ActivityPartSubPart = require("./activityPartSubPart.model.js")(sequelize, DataTypes);
db.Node = require("./node.model.js")(sequelize, DataTypes);
db.GroupNode = require("./groupNode.model.js")(sequelize, DataTypes);
db.Edge = require("./edge.model.js")(sequelize, DataTypes);

db.User.belongsToMany(db.Profile, { through: db.UserProfile });
db.Profile.belongsToMany(db.User, { through: db.UserProfile });
db.UserProfile.belongsTo(db.User);
db.UserProfile.belongsTo(db.Profile);
db.User.hasMany(db.UserProfile);
db.Profile.hasMany(db.Profile);

db.Group.belongsToMany(db.Activity, { through: db.ActivityGroup });
db.Activity.belongsToMany(db.Group, { through: db.ActivityGroup });
db.ActivityGroup.belongsTo(db.Activity);
db.ActivityGroup.belongsTo(db.Group);
db.Activity.hasMany(db.ActivityGroup);
db.Group.hasMany(db.ActivityGroup);

db.User.belongsToMany(db.ActivityGroup, { through: db.UserActivityGroup });
db.ActivityGroup.belongsToMany(db.User, { through: db.UserActivityGroup });
db.UserActivityGroup.belongsTo(db.User);
db.UserActivityGroup.belongsTo(db.ActivityGroup);
db.User.hasMany(db.UserActivityGroup);
db.ActivityGroup.hasMany(db.UserActivityGroup);

db.Part.belongsToMany(db.Activity, { through: db.ActivityPart });
db.Activity.belongsToMany(db.Part, { through: db.ActivityPart});
db.ActivityPart.belongsTo(db.Activity);
db.ActivityPart.belongsTo(db.Part);
db.Activity.hasMany(db.ActivityPart);
db.Part.hasMany(db.ActivityPart);

db.SubPart.belongsToMany(db.ActivityPart, { through: db.ActivityPartSubPart });
db.ActivityPart.belongsToMany(db.SubPart, { through: db.ActivityPartSubPart });
db.ActivityPartSubPart.belongsTo(db.SubPart);
db.ActivityPartSubPart.belongsTo(db.ActivityPart);
db.SubPart.hasMany(db.ActivityPartSubPart);
db.ActivityPart.hasMany(db.ActivityPartSubPart);

db.Node.belongsToMany(db.Group, { through: db.GroupNode });
db.Group.belongsToMany(db.Node, { through: db.GroupNode });
db.GroupNode.belongsTo(db.Group);
db.GroupNode.belongsTo(db.Node);
db.Group.hasMany(db.GroupNode);
db.Node.hasMany(db.GroupNode);

module.exports = db;