require('dotenv').config({ path: './env/dev.env' })

const Task = require('./modules/task');
const User = require('./modules/users');

function main() {
    // สร้างใบงาน
    let new_task = Task.createTask();
    let task_id = new_task.data._id;

    // Login User (1)
    let user1 = User.login('nodejs', '123456789', function (cb) {
        if (cb.status) {
            // Approve User (1)
            let do_approve = Task.approve(task_id, cb.data._id);
            console.log(`USER : ${cb.data._id}, MSG : ${do_approve.msg}`);
        }
        else {
            console.log(cb.msg);
        }
    })

    let user1_try_again = User.login('nodejs', '123456789', function (cb) {
        if (cb.status) {
            // Approve User (1)
            let do_approve = Task.approve(task_id, cb.data._id);
            console.log(`USER : ${cb.data._id}, MSG : ${do_approve.msg}`);
        }
        else {
            console.log(cb.msg);
        }
    })


    // Login User (2)
    let user2 = User.login('mongo', 'aa2233', function (cb) {
        if (cb.status) {
            // Approve User (2)
            let do_approve = Task.approve(task_id, cb.data._id);
            console.log(`USER : ${cb.data._id}, MSG : ${do_approve.msg}`);
        }
        else {
            console.log(cb.msg);
        }
    })



    // Login User (3)
    let user3 = User.login('pugjade', '78we45rt', function (cb) {
        if (cb.status) {
            // Approve User (3)
            let do_approve = Task.approve(task_id, cb.data._id);
            console.log(`USER : ${cb.data._id}, MSG : ${do_approve.msg}`);
        }
        else {
            console.log(cb.msg);
        }
    })





}

main();