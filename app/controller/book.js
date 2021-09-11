'use strict';

const Controller = require('egg').Controller;

class BookController extends Controller {
  /**
   * 基础控制器请求
   * @param {*} name service名
   * @param {*} ctx
   */
  async baseController(name, ctx) {
    let res = await ctx.service.book[name](ctx.request.body);
    if (res.status) {
      ctx.helper.success(res.data, res.msg);
    } else {
      ctx.helper.err(null, res.msg);
    }
  }

  async addType() {
    const { ctx } = this;
    await this.baseController('addType', ctx);
  }

  async editType() {
    const { ctx } = this;
    await this.baseController('editType', ctx);
  }

  async delType() {
    const { ctx } = this;
    await this.baseController('delType', ctx);
  }

  async typeList() {
    const { ctx } = this;
    await this.baseController('typeList', ctx);
  }

  async addBook() {
    const { ctx } = this;
    await this.baseController('addBook', ctx);
  }

  async editBook() {
    const { ctx } = this;
    await this.baseController('editBook', ctx);
  }

  async delBook() {
    const { ctx } = this;
    await this.baseController('delBook', ctx);
  }

  async bookList() {
    const { ctx } = this;
    await this.baseController('bookList', ctx);
  }


  async getBook() {
    const { ctx } = this;
    await this.baseController('getBook', ctx);
  }

  async applyBorrow() {
    const { ctx } = this;
    await this.baseController('applyBorrow', ctx);
  }

  async borrowList() {
    const { ctx } = this;
    await this.baseController('borrowList', ctx);
  }
    
  async editBorrowStatus() {
    const { ctx } = this;
    await this.baseController('editBorrowStatus', ctx);
  }
}

module.exports = BookController;
