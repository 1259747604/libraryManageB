// 用户鉴权中间件
module.exports = options => {
    return async function auth(ctx, next) {
        let token = ctx.request.header.authorization; //拿到token
        if (token) {
            try {
                let decoded = ctx.app.jwt.verify(token, ctx.app.config.jwt.secret); //解密token
                await next();
            } catch (error) {
                ctx.helper.err(null, "失效的token");
            }
        } else {
            ctx.helper.err(null, "token不存在");
        }
    };
};
