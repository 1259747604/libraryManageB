'use strict';

module.exports = app => {
  const { STRING, INTEGER, BOOLEAN } = app.Sequelize;

  const User = app.model.define('user', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true, notNuLL: true },
    userName: { type: STRING(45),  field: 'user_name' },    
    password: STRING(200),
    roleId: { type: INTEGER, defaultValue: 1, field: 'role_id' },  
    roleName: { type: STRING(45), defaultValue: 1, field: 'role_name' },
    isSuper: { type: BOOLEAN, defaultValue: false, field: 'is_super' },
    isDel: { type: BOOLEAN, defaultValue: false, field: 'is_del' },
  });

  // 查询某个用户通过用户名
  User.findByName = async function(userName) {
    return await this.findOne({
      where: {
        userName
      }
    });
  }

  // 查用户通过Id
  User.findById = async function(id) {
    return await this.findOne({
      where: {
        id
      }
    });
  }

  return User;
};
