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
const { generateAccessToken } = require("../middleware/generateToken");


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

Group.hasMany(Task, {
  onDelete: 'cascade', 
  foreignKey: { allowNull: false },
  hooks: true
});
Task.belongsTo(Group);

Task.hasMany(Image);
Image.belongsTo(Task);

Type.hasMany(Task);
Task.belongsTo(Type);

Step.hasOne(Task);
Task.belongsTo(Step);

Priority.hasMany(Task);
Task.belongsTo(Priority);

Priority.hasMany(Image);
Image.belongsTo(Priority);

const checkTable = async () => {
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
  gita Type.bulkCreate([
    {
      name: "Feature",
      color: "#4BADE8",
    },
    {
      name: "Bug",
      color: "#E5493A",
    },
  ]);
  const user = await User.create( 
    {
      username: 'admin123',
      password: '$2b$10$XonxxewUUoY0IgxXj.hiPO4Gi8j5HKlF80IqMbIta9JfXmj23cU1W',
      avatar: null,
      phone_number: '111111111',
      email: 'admin123@gmail.com',
      isActive: true,
      countryId: 1,
      roleId:1,
    }
  );
  const accessToken = await generateAccessToken({ user_id: user.id });

  await  Detail.create( 
    {
      userId: user?.id,
    }
  );
  await  Token.create( 
    {
      accessToken: accessToken,
      userId: user.id,
    }
  );
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
