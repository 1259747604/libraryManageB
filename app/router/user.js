module.exports = app => {
    const { router, controller } = app;
    // 登录
    router.post("/user/login", controller.user.login);

    // 注册
    router.post("/user/register", controller.user.register);

    // 获取用户信息
    router.post("/user/getInfo", controller.user.getInfo);
    
    // 获取用户列表
    router.post("/user/userList", controller.user.userList);
    
    // 修改用户状态
    router.post("/user/editUserStatus", controller.user.editUserStatus);
    
    // 检查密码
    router.post("/user/checkPwd", controller.user.checkPwd);
    
    // 更新密码
    router.post("/user/updatePwd", controller.user.updatePwd);

    // 测试
    router.get("/test", controller.test.test);
};
