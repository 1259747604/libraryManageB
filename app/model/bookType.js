'use strict';

module.exports = app => {
  const { STRING, INTEGER, BOOLEAN, DATE } = app.Sequelize;

  const BookType = app.model.define('booktype', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true, notNuLL: true },
    typeName: { type: STRING(200), notNuLL: true, field: 'type_name' },
  });
  return BookType;
};
