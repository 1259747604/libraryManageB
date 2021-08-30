'use strict';

const Controller = require('egg').Controller;

class TestController extends Controller {
  async test() {
    const { ctx } = this;
    ctx.helper.success('测试连接')
  }
}

module.exports = TestController;
