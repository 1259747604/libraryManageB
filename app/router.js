'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  require('./router/user')(app);
  require('./router/upload')(app);
  require('./router/book')(app);
  require('./router/chart')(app);
};
