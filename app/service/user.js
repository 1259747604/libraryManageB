'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  // 登录
  async login(name, pwd) {
    // 值完整性
    if (!name || !pwd) {
      return {
        msg: '登录失败，请完善登录信息',
        status: false
      };
    }

    const { ctx } = this;
    const User = ctx.model.User;
    const errObj = {
      msg: '登录失败，请确认用户名和密码是否正确',
      status: false
    };

    let userInfo = await User.findByName(name);
    if (!userInfo) {
      return errObj;
    }

    // 验证密码是否一致
    if (userInfo.password !== ctx.helper.encryp(pwd)) {
      return errObj;
    }

    const token = this.app.jwt.sign({ id: userInfo.id }, this.app.config.jwt.secret, { expiresIn: '7d' });
    return {
      data: token,
      msg: '登录成功',
      status: true
    };
  }

  // 注册
  async register(name, pwd) {
    // 值完整性
    if (!name || !pwd) {
      return {
        msg: '注册失败，请完善注册信息',
        status: false
      };
    }

    const { ctx } = this;
    const User = ctx.model.User;
    // 查询是否存在重名
    let userInfo = await User.findByName(name);

    if (userInfo) {
      return {
        msg: '注册失败，已有重名用户',
        status: false
      };
    }
    // 可以注册 进行密码加密
    let register = {
      userName: name,
      password: ctx.helper.encryp(pwd)
    };

    let res = await User.create(register);

    return {
      data: res,
      msg: '注册成功',
      status: true
    };
  }

  // 获取用户信息
  async getInfo() {
    const { ctx } = this;
    let userId = ctx.userIdObj.id;
    try {
      let res = await ctx.model.User.findById(userId);
      res = {
        id: res.id,
        userName: res.userName,
        icon: res.icon,
        sex: res.sex ? 1 : 0,
        age: res.age,
        phone: res.phone,
        isRisk: res.isRisk,
        roles: res.isAdmin ? ['admin'] : ['borrower'],
      };
      return {
        data: res,
        msg: '',
        status: true
      };
    } catch (error) {
      return {
        data: null,
        msg: '用户信息获取失败',
        status: false
      };
    }
  }
}

module.exports = UserService;
