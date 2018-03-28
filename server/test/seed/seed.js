const {ObjectID} = require('mongodb');
const {Todo} = require('./../../models/Todo');

let todos = [{
    _id: new ObjectID(),
    text: 'First test todo',
    completed: false,
    completedAt: 351532
}, {
    _id: new ObjectID(),
    text: 'Something test todo',
    completed: true,
    completedAt: 333
}];

const populateTodos = (done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
};

module.exports = {todos, populateTodos};