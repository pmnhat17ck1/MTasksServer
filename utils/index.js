const userRes = (ob) => {
  let { password, ...userNew } = ob || {};
  return userNew;
};
module.exports = { userRes };
