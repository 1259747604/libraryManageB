'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  cors: {
    enable: true,
    package: 'egg-cors'
  },

  mysql: {
    enable: true,
    package: 'egg-mysql'
  },

  sequelize: {
    enable: true,
    package: 'egg-sequelize'
  },

  jwt: {
    enable: true,
    package: 'egg-jwt'
  },

  oss: {
    enable: true,
    package: 'egg-oss'
  }
};
