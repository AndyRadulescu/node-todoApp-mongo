const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');

// Todo.remove({}).then((res)=>{
//     console.log(res);
// });

Todo.findByIdAndRemove('5ab8db458ad27f32c415ee19').then((todo)=>{
    console.log(todo);
});