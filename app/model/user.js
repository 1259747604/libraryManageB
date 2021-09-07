'use strict';

module.exports = app => {
  const { STRING, INTEGER, BOOLEAN } = app.Sequelize;

  const User = app.model.define('user', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true, notNuLL: true },
    userName: { type: STRING(45),  field: 'user_name' },    
    password: STRING(200),
    roleIds: { type: STRING(100), defaultValue: '2', field: 'role_ids' },  
    roleNames: { type: STRING(200), defaultValue: 'editor', field: 'role_names' },
    isDel: { type: BOOLEAN, defaultValue: false, field: 'is_del' },
    icon: STRING(200)
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
