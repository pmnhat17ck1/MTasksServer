const { Image } = require('./Image')
const { Type } = require('./Type')
const { Step } = require('./Step')
const { User } = require('./User')
const { Group } = require('./Group')
const { Role } = require('./Role')
const { Country } = require('./Country')
const { Task } = require('./Task')
const { Detail } = require('./Detail')
const { Priority } = require('./Priority')



////relationship

User.hasOne(Detail);
Detail.belongsTo(User);

Role.hasOne(User);
User.belongsTo(Role);

Country.hasOne(User);
User.belongsTo(Country);

User.hasMany(Group);
Group.belongsTo(User);

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
}