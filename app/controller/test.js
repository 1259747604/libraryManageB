'use strict';

const Controller = require('egg').Controller;

class TestController extends Controller {
  async test() {
    const { ctx } = this;
    let info = await ctx.helper.getUserInfoByToken(ctx.headers.authorization)
    let res = await ctx.model.Test.findAll({limit: 1});
    ctx.helper.success(info)
  }
}

module.exports = TestController;
