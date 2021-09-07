'use strict';

module.exports = app => {
  const { STRING, INTEGER, BOOLEAN } = app.Sequelize;

  const User = app.model.define('user', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true, notNuLL: true },
    userName: { type: STRING(45), field: 'user_name' },
    password: STRING(200),
    icon: STRING(200),
    sex: { type: BOOLEAN, defaultValue: true },
    age: { type: INTEGER },
    phone: { type: STRING(45) },
    isRisk: { type: BOOLEAN, defaultValue: false },
    isAdmin: { type: BOOLEAN, defaultValue: false },
    isDel: { type: BOOLEAN, defaultValue: false, field: 'is_del' }
  });

  // 查询某个用户通过用户名
  User.findByName = async function (userName) {
    return await this.findOne({
      where: {
        userName
      }
    });
  };

  // 查用户通过Id
  User.findById = async function (id) {
    return await this.findOne({
      where: {
        id
      }
    });
  };

  return User;
};
