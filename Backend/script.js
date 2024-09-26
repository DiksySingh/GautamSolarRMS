// const moment = require("moment");
// console.log(moment().toString());
// console.log(moment().format('YYYY-MM-DD HH:mm:ss'));
// const startOfMonth = moment().startOf('month').toDate();
// console.log(startOfMonth);
// const endOfMonth = moment().endOf('month').toDate();
// console.log(endOfMonth);
// const startOfYear = moment().startOf('year').toDate();
// const endOfYear = moment().endOf('year').toDate();
// console.log(startOfYear," ",endOfYear);

// const imei = '555666777888999';
// const simNo = '444555666777888';
// const baseUrl = 'http://localhost:3000/device/addData?qs=';
// const faults = ['FAULT-01', 'FAULT-02', 'FAULT-03', 'FAULT-04', 'FAULT-05'];
// const date = new Date('2024-09-01T10:00:00'); // Start date

// Helper function to generate a random float number
// function getRandomFloat(min, max) {
//     return (Math.random() * (max - min) + min).toFixed(2);
// }

// for (let i = 1; i < 20; i++) {
//     let dateString = date.toISOString().split('T')[0] + ' ' + date.toTimeString().split(' ')[0]; // Format date
//     let inputVoltage = getRandomFloat(300, 320); // Random input voltage
//     let inputCurrent = getRandomFloat(0.5, 1.0); // Random input current
//     let inputPower = getRandomFloat(120, 130); // Random input power
//     let outputVoltage = getRandomFloat(210, 230); // Random output voltage
//     let outputCurrent = getRandomFloat(0.7, 1.2); // Random output current
//     let outputPower = getRandomFloat(900, 950); // Random output power
//     let todayEnergy = getRandomFloat(3.0, 5.0); // Random today energy
//     let totalEnergy = getRandomFloat(40.0, 50.0); // Random total energy
//     let fault = faults[Math.floor(Math.random() * faults.length)]; // Random fault

//     let url = `${baseUrl}${imei}$${simNo}$${dateString}$${inputVoltage}$${inputCurrent}$${inputPower}$${outputVoltage}$${outputCurrent}$${outputPower}$${fault}$${todayEnergy}$${totalEnergy}`;

//     console.log(`${i}. ${url}`);

//     // Increment the date by 1 day
//     date.setDate(date.getDate() + 1);
// }

const time = new Date();
const current_time = new Date(time.getTime() + (5 * 60 + 30) * 60 * 1000);
DATE_TIME = "2024-09-06T04:30:00.000+00:00";
const lastTime = new Date (DATE_TIME)
const updatedTime = new Date(lastTime.getTime() + (5 * 60 + 30) * 60 *1000);
console.log(updatedTime);

const diff = current_time - updatedTime;
console.log(diff);