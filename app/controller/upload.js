'use strict';

const Controller = require('egg').Controller;
const fs = require('mz/fs');
const path = require('path')

class UploadController extends Controller {
  async uploadImg() {
    const { ctx } = this;
    if (!ctx.request.files) {
      return ctx.helper.err(null, '请先选择上传文件');
    }
    const file = ctx.request.files[0];
    const name = 'imgs/' + file.filename;
    let result;
    try {
        result = await ctx.oss.put(name, file.filepath);
    } catch (err) {
        console.log(err);
    } finally {
        await fs.unlink(file.filepath);
    }

    if (result) {
        return ctx.helper.success(result.url);
    }
    ctx.helper.err(null, '上传失败');
  }
}

module.exports = UploadController;
