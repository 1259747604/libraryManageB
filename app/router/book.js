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

  // 添加图书
  router.post('/book/addBook', controller.book.addBook);
  
  // 修改图书
  router.post('/book/editBook', controller.book.editBook);
  
  // 删除图书
  router.post('/book/delBook', controller.book.delBook);
  
  // 图书列表
  router.post('/book/bookList', controller.book.bookList);
 
  // 查询图书
  router.post('/book/getBook', controller.book.getBook);

  // 申请借阅
  router.post('/book/applyBorrow', controller.book.applyBorrow);
  
  // 借阅列表
  router.post('/book/borrowList', controller.book.borrowList);
  
  // 修改借阅状态
  router.post('/book/editBorrowStatus', controller.book.editBorrowStatus);
};
