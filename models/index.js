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

const create_relationship = () => {
  ////relationship
  User.hasOne(Detail, { onDelete: 'cascade', hooks:true });
  Detail.belongsTo(User);

  User.hasOne(Token, { onDelete: 'cascade', hooks:true });
  Token.belongsTo(User);

  Role.hasMany(User, { onDelete: 'cascade', hooks:true });
  User.belongsTo(Role);

  Country.hasOne(User, { onDelete: 'cascade', hooks:true });
  User.belongsTo(Country);

  User.hasMany(Group, { onDelete: 'cascade', hooks:true });
  Group.belongsTo(User);

  User.hasMany(Notification, { onDelete: 'cascade', hooks:true });
  Notification.belongsTo(User);

  Group.hasMany(Task, { onDelete: 'cascade', hooks:true });
  Task.belongsTo(Group);

  Task.hasMany(Image, { onDelete: 'cascade', hooks:true });
  Image.belongsTo(Task);

  Type.hasMany(Task, { onDelete: 'cascade', hooks:true });
  Task.belongsTo(Type);

  Step.hasOne(Task, { onDelete: 'cascade', hooks:true });
  Task.belongsTo(Step);

  Priority.hasMany(Task, { onDelete: 'cascade', hooks:true });
  Task.belongsTo(Priority);

  Priority.hasMany(Image, { onDelete: 'cascade', hooks:true });
  Image.belongsTo(Priority);
};
create_relationship();
const checkTable = async () => {
  const role = await Role?.countAll();
  const country = await Country?.countAll();
  const priority = await Priority?.countAll();
  const step = await Step?.countAll();
  const type = await Type?.countAll();
  if (role?.length > 0  &&  country?.length > 0 && priority?.length > 0 && step?.length > 0 && type?.length > 0) {
    return;
  }
  await Country.add("Việt nam", "vi");
  await Country.add("US", "en");
  await Role.add("admin")
  await Role.add("member")
  await Step.add("To do", "", "");
  await Step.add("In progress", "", "")
  await Step.add("Review", "", "")
  await Step.add("Done", "", "")
  await Type.add("Feature", "#4BADE8")
  await Type.add("Bug", "#E5493A")
  await Priority.add("medium")
  await Priority.add("high")
  await Priority.add("highest")
  const user = await User.add('admin123', '$2b$10$XonxxewUUoY0IgxXj.hiPO4Gi8j5HKlF80IqMbIta9JfXmj23cU1W','111111111', 'admin123@gmail.com', true, 1, 1 )
  const accessToken = await generateAccessToken({ user_id: user.id });
  await Detail.add(user?.id)
  await Token.add(user.id, accessToken, accessToken)
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
