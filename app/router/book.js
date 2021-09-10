module.exports = app => {
  const { router, controller } = app;
  // 新增类名
  router.post('/book/addType', controller.book.addType);

  // 查询分类
  router.post('/book/typeList', controller.book.typeList);

  // 修改分类
  router.post('/book/editType', controller.book.editType);

  // 删除分类
  router.post('/book/delType', controller.book.delType);
};
