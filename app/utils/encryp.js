const crypto = require('crypto');

/*对密码进行加密*/
module.exports = (pwd,key='ttisgoodBoy') => {
    let hmac = crypto.createHmac("sha256",key);
    hmac.update(pwd);
    const pwdHmac = hmac.digest('hex');
    return pwdHmac;
};