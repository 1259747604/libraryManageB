'use strict';

const Service = require('egg').Service;
const { Op } = require('sequelize');

class BookService extends Service {
  async addType(body) {
    const { name } = body;
    if (!name) {
      return {
        msg: '新增失败，请输入有效值',
        status: false
      };
    }

    const { ctx } = this;
    const BookType = ctx.model.BookType;

    // 查询是否存在重名
    let typeInfo = await BookType.findByName(name);
    if (typeInfo) {
      return {
        msg: '新增失败，已有重名类',
        status: false
      };
    }

    let obj = {
      typeName: name,
      createTime: new Date()
    };

    try {
      await BookType.create(obj);
      return {
        data: null,
        msg: '新增成功',
        status: true
      };
    } catch (error) {
      return {
        msg: '新增失败',
        status: false
      };
    }
  }

  async editType(body) {
    const { name, id } = body;
    const { ctx } = this;
    const BookType = ctx.model.BookType;
    // 查询是否存在重名
    let typeInfo = await BookType.findByName(name);
    if (typeInfo) {
      return {
        msg: '修改失败，已有重名类',
        status: false
      };
    }

    try {
      await BookType.update(
        { typeName: name },
        {
          where: {
            id
          }
        }
      );
      return {
        data: null,
        msg: '修改成功',
        status: true
      };
    } catch (error) {
      return {
        msg: '修改失败',
        status: false
      };
    }
  }

  async delType(body) {
    const { ids } = body;
    const { ctx } = this;
    const BookType = ctx.model.BookType;
    const Book = ctx.model.Book;
    
    try {
      await Book.destroy({
        where: {
          bookType:{
            [Op.in]: ids
          }
        }
      })
      await BookType.destroy({
        where: {
          id:{
            [Op.in]: ids
          }
        }
      })
      return {
        data: null,
        msg: '删除成功',
        status: true
      };
    } catch (error) {
      return {
        msg: `删除异常${error}`,
        status: false
      };
    }
  }

  async typeList(body) {
    const { ctx } = this;
    let { pageSize, pageNumber, name } = body;
    const BookType = ctx.model.BookType;

    let likeName = '%%';
    if (name) {
      likeName = `%${name}%`;
    }

    try {
      let { count, rows } = await BookType.findAndCountAll({
        order: [['createTime', 'DESC']],
        where: {
          typeName: {
            [Op.like]: likeName
          }
        },
        offset: (pageNumber - 1) * pageSize,
        limit: pageSize
      });
      return {
        data: {
          total: count,
          list: rows
        },
        msg: '',
        status: true
      };
    } catch (error) {
      return {
        msg: `查询失败:${error}`,
        status: false
      };
    }
  }
}

module.exports = BookService;
