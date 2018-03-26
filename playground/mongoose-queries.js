const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');


// let id = '5ab8cd6890131e16bf5f8';
// if (!ObjectID.isValid(id)) {
//     console.log('ID not valid');
// }
// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos', todos);
// });

// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todo', todo);
// });

// Todo.findById(id).then((todo) => {
//     if (!todo) {
//         return console.log('id Not Found');
//     }
//     console.log('Todo By Id', todo);
// }).catch((err) => console.log(err));
let userId = '5ab8b1f3f372d02e00717b41';
if (!ObjectID.isValid(userId)) {
    console.log('mortii ma-sii, id is wrong');
} else {
    User.findById(userId).then((user) => {
        if (!user) {
            return console.log('Id not found');
        }
        console.log('User by id', user);
    }).catch((err) => console.log(e));
}