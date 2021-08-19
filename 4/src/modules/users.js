var users = [
    {
        _id: 1,
        username: 'nodejs',
        password: '123456789'
    },
    {
        _id: 2,
        username: 'mongo',
        password: 'aa2233'
    },
    {
        _id: 3,
        username: 'pugjade',
        password: '78we45rt'
    }
]

module.exports.login = (input_username, input_password, callback) => {
    let user = users.find(v => v.username == input_username && v.password == input_password);
    if (!user) {
        callback({ status: false, msg: 'Username หรือ Password ไม่ถูกต้อง' });
        return;
    }
    callback({ status: true, data: user, msg: 'เข้าสู่ระบบสำเร็จ' });
    return;
}

module.exports.getTotal_user = () => {
    return users.length;
}


