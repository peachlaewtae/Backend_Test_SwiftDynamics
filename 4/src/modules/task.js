
let data = [];
let cnt = 1;


const User = require('../modules/users');
const nodemailer = require('./nodemailer');

module.exports.createTask = () => {
    let newData = { _id: cnt, log: [] };;
    data.push(newData);
    cnt++;
    return { status: true, msg: 'เพิ่ม Task สำเร็จ', data: newData };
}

module.exports.approve = (task_id, approvedBy) => {
    let select_task = data.find(v => v._id == task_id);
    if (!select_task) {
        return { status: false, msg: 'ไม่พบใบงานนี้' };
    }

    let find_isalready_approve = select_task.log.find(v => v.approvedBy == approvedBy);
    if (find_isalready_approve) {
        return { status: false, msg: 'คุณได้ approve ไปแล้ว' };
    }

    if (select_task.log.length == User.getTotal_user()) {
        return { status: false, msg: 'เกิดข้อผิดพลาด' };
    }

    select_task.log.push({ approvedBy: approvedBy, date: Date.now() });

    if (select_task.log.length == User.getTotal_user()) {
        nodemailer.sendEmail(`napat.s@swiftdynamics.co.th`, 'การแจ้งเตือนใบงานเสมือน', `มีการยืนยันครบ ${User.getTotal_user()} ผู้ใช้งาน แล้ว`);
    }


    return { status: true, msg: 'Approve สำเร็จ' };
}