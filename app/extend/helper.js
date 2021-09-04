// 请求成功
const success = function (data, msg = '') {
  this.ctx.body = {
    status: true,
    msg,
    data
  };
};

// 请求失败
const err = function (data, msg = '') {
  this.ctx.body = {
    status: false,
    msg,
    data
  };
};

// 获取用户信息
const getUserInfoByToken = async function (token) {
  let { id } = this.ctx.app.jwt.verify(token, this.ctx.app.config.jwt.secret);
  return await this.ctx.model.User.findById(id);
};

// 加密
const encryp = require('../utils/encryp');

module.exports = {
  success,
  err,
  encryp,
  getUserInfoByToken
};
