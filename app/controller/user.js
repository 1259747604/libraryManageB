'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  // 登录
  async login() {
    const { ctx } = this;
    const userName = ctx.request.body.userName;
    const pwd = ctx.request.body.password;
    let res = await ctx.service.user.login(userName, pwd);
    if (res.status) {
      ctx.helper.success(res.data, res.msg);
    } else {
      ctx.helper.err(null, res.msg);
    }
  }

  // 注册
  async register() {
    const { ctx } = this;
    const userName = ctx.request.body.userName;
    const pwd = ctx.request.body.password;
    let res = await ctx.service.user.register(userName, pwd);
    if (res.status) {
      ctx.helper.success(res.data, res.msg);
    } else {
      ctx.helper.err(null, res.msg);
    }
  }

  // 获取用户信息
  async getInfo() {
    const { ctx } = this;
    let res = await ctx.service.user.getInfo();
    if (res.status) {
      ctx.helper.success(res.data, res.msg);
    } else {
      ctx.helper.err(null, res.msg);
    }
  }
}

module.exports = UserController;
