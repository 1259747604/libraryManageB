'use strict';

module.exports = app => {
  const { STRING, INTEGER, BOOLEAN, DATE } = app.Sequelize;

  const BookType = app.model.define('booktype', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true, notNuLL: true },
    typeName: { type: STRING(200), notNuLL: true, field: 'type_name' },
    num: { type: INTEGER, notNuLL: true, defaultValue: 0},
    createTime: { type: DATE, notNuLL: true, field: 'create_time' }
  });

   // 查询类名通过名字
   BookType.findByName = async function (typeName) {
    return await this.findOne({
      where: {
        typeName
      }
    });
  };

  return BookType;
};
