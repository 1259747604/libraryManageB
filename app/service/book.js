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
          bookType: {
            [Op.in]: ids
          }
        }
      });
      await BookType.destroy({
        where: {
          id: {
            [Op.in]: ids
          }
        }
      });
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

    let searchObj = {
      order: [['createTime', 'DESC']],
      where: {
        typeName: {
          [Op.like]: likeName
        }
      }
    };

    if (pageNumber > 0) {
      searchObj.offset = (pageNumber - 1) * pageSize;
      searchObj.limit = pageSize;
    }

    try {
      let { count, rows } = await BookType.findAndCountAll(searchObj);
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

  async addBook(body) {
    const { ctx } = this;
    const Book = ctx.model.Book;
    const BookType = ctx.model.BookType;

    // 查询是否存在重名
    let bookInfo = await Book.findByName(body.bookName);
    if (bookInfo) {
      return {
        msg: '新增失败，已有重名书籍',
        status: false
      };
    }
    let obj = {
      bookName: body.bookName,
      bookAuthor: body.bookAuthor,
      bookPub: body.bookPub,
      bookNum: body.bookNum,
      bookPrice: body.bookPrice,
      bookType: body.bookType,
      isbn: body.isbn,
      img: body.img,
      createTime: new Date()
    };

    try {
      const typeInfo = await BookType.findByPk(body.bookType);
      await typeInfo.increment('num');
      await Book.create(obj);
      return {
        data: null,
        msg: '新增成功',
        status: true
      };
    } catch (error) {
      return {
        msg: error,
        status: false
      };
    }
  }

  async editBook(body) {
    const { ctx } = this;
    const { id } = body;
    const Book = ctx.model.Book;
    const BookType = ctx.model.BookType;

    // 查询是否存在重名
    let bookInfo = await BookType.findByName(body.bookName);
    if (bookInfo) {
      return {
        msg: '修改失败，已有重名书籍',
        status: false
      };
    }
    let obj = {
      bookName: body.bookName,
      bookAuthor: body.bookAuthor,
      bookPub: body.bookPub,
      bookNum: body.bookNum,
      bookPrice: body.bookPrice,
      bookType: body.bookType,
      isbn: body.isbn,
      img: body.img
    };

    try {
      if (body.bookType !== body.oldType) {
        const typeInfo = await BookType.findByPk(body.bookType);
        await typeInfo.increment('num');

        const typeInfo1 = await BookType.findByPk(body.oldType);
        await typeInfo1.decrement('num');
      }

      await Book.update(obj, {
        where: {
          id
        }
      });
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

  async delBook(body) {
    const { ids, types } = body;
    const { ctx } = this;
    const BookType = ctx.model.BookType;
    const Book = ctx.model.Book;

    const deTypeNum = async id => {
      let typeInfo = await BookType.findByPk(id);
      if (typeInfo) {
        await typeInfo.decrement('num');
      }
    };

    try {
      for (let i = 0; i < types.length; i++) {
        await deTypeNum(types[i]);
      }
      await Book.destroy({
        where: {
          id: {
            [Op.in]: ids
          }
        }
      });
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

  async bookList(body) {
    const { ctx } = this;
    let { pageSize, pageNumber, bookName, bookAuthor, bookPub, bookType, isbn } = body;
    const Book = ctx.model.Book;
    const BookType = ctx.model.BookType;
    Book.belongsTo(BookType, { foreignKey: 'bookType' });

    let [likeName, likeAuthor, likePub] = ['%%', '%%', '%%'];
    if (bookName) {
      likeName = `%${bookName}%`;
    }
    if (bookAuthor) {
      likeAuthor = `%${bookAuthor}%`;
    }
    if (bookPub) {
      likePub = `%${bookPub}%`;
    }

    let searchObj = {
      order: [['createTime', 'DESC']],
      where: {
        bookName: {
          [Op.like]: likeName
        },
        bookAuthor: {
          [Op.like]: likeAuthor
        },
        bookPub: {
          [Op.like]: likePub
        }
      },
      include: {
        model: BookType
      }
    };
    if (isbn) {
      searchObj.where.isbn = { [Op.eq]: isbn };
    }
    if (bookType) {
      searchObj.where.bookType = { [Op.eq]: bookType };
    }

    if (pageNumber > 0) {
      searchObj.offset = (pageNumber - 1) * pageSize;
      searchObj.limit = pageSize;
    }

    try {
      let { count, rows } = await Book.findAndCountAll(searchObj);
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

  async getBook(body) {
    const { ctx } = this;
    const Book = ctx.model.Book;
    const { id } = body;
    try {
      let res = await Book.findByPk(id);
      return {
        data: res,
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
