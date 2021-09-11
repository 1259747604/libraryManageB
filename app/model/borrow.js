'use strict';

module.exports = app => {
  const { STRING, INTEGER, BOOLEAN, DATE } = app.Sequelize;

  const Borrow = app.model.define('borrow', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true, notNuLL: true },
    userId: { type: INTEGER, notNuLL: true, field: 'user_id' },
    userName: { type: STRING(45), notNuLL: true, field: 'user_name' },
    bookId: { type: INTEGER, notNuLL: true, field: 'book_id' },
    recordTime: { type: DATE, notNuLL: true, field: 'record_time' },
    expectedReturnTime: { type: DATE, notNuLL: true, field: 'expected_return_time' },
    returnTime: { type: DATE, field: 'return_time' },
    status: { type: INTEGER, notNuLL: true, defaultValue: 0 }
  });
  return Borrow;
};
