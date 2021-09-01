'use strict';

const Controller = require('egg').Controller;

class TestController extends Controller {
  async test() {
    const { ctx } = this;
    let res = await ctx.model.Test.findAll({limit: 1});
    ctx.helper.success(res)
  }
}

module.exports = TestController;
