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

  const role = await Role?.countAll();
  const country = await Country?.countAll();
  const priority = await Priority?.countAll();
  const step = await Step?.countAll();
  const type = await Type?.countAll();
  if (role?.length > 0 || country?.length > 0 || priority?.length > 0 || step?.length > 0 || type?.length > 0) {
    return;
  }
  Country.add("Việt nam", "vi");
  Country.add("US", "en");
  Role.add("admin")
  Role.add("member")
  Priority.add("medium")
  Priority.add("high")
  Priority.add("highest")
  Step.add("To do", "", "");
  Step.add("In progress", "", "")
  Step.add("Review", "", "")
  Step.add("Done", "", "")
  Type.add("Feature", "#4BADE8")
  Type.add("Bug", "#E5493A")
  const user = User.add('admin123', '$2b$10$XonxxewUUoY0IgxXj.hiPO4Gi8j5HKlF80IqMbIta9JfXmj23cU1W','111111111', 'admin123@gmail.com', true, 1, 1 )
  const accessToken = await generateAccessToken({ user_id: user.id });
  Detail.add(user?.id)
  Token.add(user.id, accessToken)
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
