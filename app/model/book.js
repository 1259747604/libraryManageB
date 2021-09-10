'use strict';

module.exports = app => {
  const { STRING, INTEGER, BOOLEAN, DATE } = app.Sequelize;

  const Book = app.model.define('book', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true, notNuLL: true },
    bookName: { type: STRING(200), notNuLL: true, field: 'book_name' },
    bookAuthor: { type: STRING(200), notNuLL: true, field: 'book_author' },
    bookPub: { type: STRING(200), notNuLL: true, field: 'book_pub' },
    bookNum: { type: INTEGER, notNuLL: true, field: 'book_num', defaultValue: 0 },
    bookPrice: { type: STRING(45), notNuLL: true, field: 'book_price' },
    bookType: { type: INTEGER, notNuLL: true, field: 'book_type' },
    isbn: { type: STRING(45), notNuLL: true,},
    img: { type: STRING(200), notNuLL: true,},
    createTime: { type: DATE, notNuLL: true, field: 'create_time' }
  });

  // 查询类名通过名字
  Book.findByName = async function (bookName) {
    return await this.findOne({
      where: {
        bookName
      }
    });
  };
  return Book;
};
