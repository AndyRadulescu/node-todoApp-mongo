const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

let password = '123abc!';

bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
        console.log('hash', hash);
    })
});

let hashedPassword = '$2a$10$3Ad/NZOqAb.R2whK55V.P.wbQnecUnNw3xlfH3.O.7rIv.CZ5KEQS';

bcrypt.compare(password, hashedPassword, (err, res) => {
    console.log(res);
});


// let data = {
//     id: 10
// };
//
// let token = jwt.sign(data, '123abc');
//
// console.log(token);
//
// var decoded = jwt.verify(token, '123abc');
// console.log('decoded', decoded);
// let message = 'I am user number 3';
// let hash = SHA256(message).toString();
//
// console.log(`Message: ${message}`);
// console.log(`hash: ${hash}`);
//
// var data = {
//     id: 4
// };
//
// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// };
//
// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();
//
// if (resultHash === token.hash) {
//     console.log('Data has not been change');
// } else {
//     console.log('dont trust');
// }