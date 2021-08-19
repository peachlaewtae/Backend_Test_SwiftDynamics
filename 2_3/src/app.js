const express = require('express')
const app = express()

const request = require('request');

function fn_min(arr_of_data) {
    // (1) จัดการเลือก Key ที่จะใช้การในคำนวน ปรับ Format ใหม่ให้อยู่ข้อมูลเป็นก้อน Array
    let arr_of_number = arr_of_data.map(function (v) {
        return v.data;
    });

    // (2) Sort เรียงลำดับ ค่าน้อย - ไปมาก

    arr_of_number.sort(function (a, b) {
        return a - b;
    });

    // (3) ส่งผลลัพธ์ตอบกลับ
    return arr_of_number[0];
}

function fn_max(arr_of_data) {
    // (1) จัดการเลือก Key ที่จะใช้การในคำนวน ปรับ Format ใหม่ให้อยู่ข้อมูลเป็นก้อน Array
    let arr_of_number = arr_of_data.map(function (v) {
        return v.data;
    });

    // (2) Sort เรียงลำดับ ค่าน้อย - ไปมาก
    arr_of_number.sort(function (a, b) {
        return b - a;
    });

    // (3) ส่งผลลัพธ์ตอบกลับ
    return arr_of_number[0];
}

function fn_avg(arr_of_data) {
    // (1) จัดการเลือก Key ที่จะใช้การในคำนวน ปรับ Format ใหม่ให้อยู่ข้อมูลเป็นก้อน Array
    let arr_of_number = arr_of_data.map(function (v) {
        return v.data;
    });

    // (2) นำข้อมูลไป + เพื่อหาผลลัพธ์ทั้งหมด
    let total_sum = arr_of_number.reduce((a, b) => a + b, 0)

    // (3) คำนวนค่าเฉลีย
    let average = total_sum / arr_of_number.length;

    return average.toFixed(2);



}

const previous_data = [];
var temp_arr_predict = [];
async function main() {
    let data = await getDataFromAPI();

    let period_data = format_data_by_period_date(data);


    for (let i = 0; i < period_data.length; i++) {
        previous_data.push(
            {
                date: format_date(period_data[i].date),
                max: fn_max(period_data[i].data),
                min: fn_min(period_data[i].data),
                avg: fn_avg(period_data[i].data),
                total_data: period_data[i].data.length,
                last_data: period_data[i].data[period_data[i].data.length - 1]
            }
        );;
        temp_arr_predict.push({ date: format_date(period_data[i].date), data: period_data[i].data[period_data[i].data.length - 1].data });
    }



    // PREDICT 7 DAY
    for (let i = 7; i <= 14; i++) {
        let this_date = new Date(`${temp_arr_predict[i - 1].date}`);
        this_date.setDate(this_date.getDate() + 1);

        let predict_data = ((temp_arr_predict[i - 3].data + temp_arr_predict[i - 2].data + temp_arr_predict[i - 1].data) / 3).toFixed(2);

        temp_arr_predict.push({ date: this_date.toISOString().split('T')[0], data: +predict_data });

    }



}



function format_data_by_period_date(arr_data) {
    let period_date = [];
    for (let i = 0; i < arr_data.length; i++) {
        let this_date = arr_data[i].timestamp.split('T')[0];
        let already_has_date = period_date.find(v => v.date == this_date);
        if (already_has_date) {
            already_has_date.data.push(arr_data[i]);
        }
        else {
            period_date.push({ date: this_date, data: [arr_data[i]] });
        }
    }

    return period_date;
}

function getDataFromAPI() {
    return new Promise(function (resolve, reject) {
        request.get({ uri: 'http://3.1.189.234:8091/data/ttntest', json: true }, function (error, response, body) {
            if (error) {
                reject(`CAN'T GET DATA FROM API (1)`);
            }
            resolve(body);
        })
    })

}

function format_date(str) {
    str = new Date(str);
    str = str.toISOString();
    let ddmmyyyy = str.split('T')[0];

    return ddmmyyyy;
}

app.get('/getData', function (req, res) {
    res.json({ previos_data: previous_data, predict_data: temp_arr_predict });
})

app.listen(3000)



main();