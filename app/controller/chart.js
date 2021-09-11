'use strict';

const Controller = require('egg').Controller;

class ChartController extends Controller {
  async getChartDt() {
    const { ctx } = this;
    let res = await ctx.service.chart.getChartDt();
    if (res.status) {
      ctx.helper.success(res.data, res.msg);
    } else {
      ctx.helper.err(null, res.msg);
    }
  }
}

module.exports = ChartController;
