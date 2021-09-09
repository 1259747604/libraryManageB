'use strict';

const Controller = require('egg').Controller;

class BookController extends Controller {
  async addType() {
    const { ctx } = this;
    let res = await ctx.service.book.addType(ctx.request.body);
    if (res.status) {
      ctx.helper.success(res.data, res.msg);
    } else {
      ctx.helper.err(null, res.msg);
    }
  }

  async editType() {
    const { ctx } = this;
    let res = await ctx.service.book.editType(ctx.request.body);
    if (res.status) {
      ctx.helper.success(res.data, res.msg);
    } else {
      ctx.helper.err(null, res.msg);
    }
  }

  async typeList() {
    const { ctx } = this;
    let res = await ctx.service.book.typeList(ctx.request.body);
    if (res.status) {
      ctx.helper.success(res.data, res.msg);
    } else {
      ctx.helper.err(null, res.msg);
    }
  }
}

module.exports = BookController;
