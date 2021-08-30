// 请求成功
const success = function(data, msg = ""){
    this.ctx.body = {
        status: true,
        msg,
        data
    };
};

// 请求失败
const err = function(data, msg = ""){
    this.ctx.body = {
        status: false,
        msg,
        data
    };
};

module.exports =  {
    success,
    err
};
