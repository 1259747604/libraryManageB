module.exports = app => {
    const { router, controller } = app;
    // 登录
    router.post("/user/login", controller.user.login);

    // 注册
    router.post("/user/register", controller.user.register);

    // 测试
    router.get("/test", controller.test.test);
};
