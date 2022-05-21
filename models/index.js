const { Image } = require("./Image");
const { Type } = require("./Type");
const { Step } = require("./Step");
const { User } = require("./User");
const { Group } = require("./Group");
const { Role } = require("./Role");
const { Country } = require("./Country");
const { Task } = require("./Task");
const { Detail } = require("./Detail");
const { Priority } = require("./Priority");
const { Notification } = require("./Notification");
const { Token } = require("./Token");

////relationship
User.hasOne(Detail);
Detail.belongsTo(User);

User.hasOne(Token);
Token.belongsTo(User);

Role.hasMany(User);
User.belongsTo(Role);

Country.hasOne(User);
User.belongsTo(Country);

User.hasMany(Group);
Group.belongsTo(User);

User.hasMany(Notification);
Notification.belongsTo(User);

Group.hasMany(Task);
Task.belongsTo(Group);

Task.hasMany(Image);
Image.belongsTo(Task);

Type.hasOne(Task);
Task.belongsTo(Type);

Step.hasOne(Task);
Task.belongsTo(Step);

Priority.hasMany(Image);
Image.belongsTo(Priority);

const checkTable = async () => {
  const role = await Role.count();
  const country = await Country.count();
  if (role > 0 && country > 0) {
    return;
  }
  Country.bulkCreate([
    {
      name: "Việt nam",
      continent_name: "vi",
    },
    {
      name: "US",
      continent_name: "en",
    },
  ]);
  Role.bulkCreate([
    {
      name: "admin",
    },
    {
      name: "member",
    },
  ]);

  Priority.bulkCreate([
    {
      name: "medium",
    },
    {
      name: "high",
    },
    {
      name: "highest",
    },
  ]);
  Step.bulkCreate([
    {
      name: "To do",
      description: "",
      color: "",
    },
    {
      name: "In progress",
      description: "",
      color: "",
    },
    {
      name: "Review",
      description: "",
      color: "",
    },
    {
      name: "Done",
      description: "",
      color: "",
    },
  ]);
};

checkTable();

module.exports = {
  Image,
  Type,
  Step,
  User,
  Group,
  Role,
  Task,
  Country,
  Detail,
  Token,
  Notification,
  Priority,
};
