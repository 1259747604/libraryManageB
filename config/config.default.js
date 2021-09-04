/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1630295582302_2615';

  // add your middleware config here
  config.middleware = ['auth'];

  config.auth = {
    // 鉴权白名单
    ignore: ['/user/login', "/user/register"]
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
    credentials: true
  };

  config.security = {
    csrf: false
  };

  config.sequelize = {
    dialect: 'mysql',
    host: '192.168.153.130',
    port: 3306,
    database: 'libraryWeb',
    username: 'root',
    password: '111111Qqq.',
    define: {
      freezeTableName: true,
      underscored: true,
      timestamps: false
    }
  };

  config.jwt = {
    secret: 'pikapika'
  };

  return {
    ...config,
    ...userConfig
  };
};
