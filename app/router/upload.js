module.exports = app => {
  const { router, controller } = app;
  // 上传 图片
  router.post("/upload/img", controller.upload.uploadImg);

};
