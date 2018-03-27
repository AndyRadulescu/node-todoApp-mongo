let env = process.env.NODE_ENV || 'development';
console.log(process.env.NODE_ENV);
console.log('env ********', env);

if (env === 'development') {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
} else if (env === 'test') {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
}


const express = require('express');
const _ = require('lodash');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

let {mongoose} = require('./db/mongoose');
let {Todo} = require('./models/Todo');
let {User} = require('./models/User');

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    let todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }).catch((err) => res.status(400).send(err));
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos})
    }).catch((err) => res.status(400).send(err));
});

app.get('/todos/:id', (req, res) => {
    let id = req.params.id;

    if (!ObjectID.isValid(id)) {
        console.log(`the id ${id} id not valid`);
        res.status(404).send();
    } else {
        Todo.findById(id).then((todo) => {
            if (!todo) {
                res.status(404).send();
                console.log(`The id ${id} did not match with any in the db.`);
                return;
            }
            res.send({todo});
        }).catch((err) => {
            console.log(err);
            return res.status(400).send();
        });
    }
});

app.delete('/todos/:id', (req, res) => {
    // get the id
    let id = req.params.id;
    console.log(id);

    if (!ObjectID.isValid(id)) {
        console.log(`the id ${id} id not valid`);
        return res.status(404).send();
    } else {
        Todo.findByIdAndRemove(id).then((todo) => {
            if (!todo) {
                res.status(404).send();
                console.log(`The id ${id} did not match with any in the db.`);
                return;
            }
            res.send({todo});
        }).catch((err) => {
            console.log(err);
            return res.status(400).send();
        });
    }

    // validate the id

    // remove todo by id 
    // success
});

app.patch('/todos/:id', (req, res) => {
    let id = req.params.id;
    console.log(id);
    let body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectID.isValid(id)) {
        console.log(`the id ${id} id not valid`);
        return res.status(404).send();
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    });
});

// POST /user
app.post('/users', (req, res) => {
    let body = _.pick(req.body, ['email', 'password']);
    let user = new User(body);

    user.save().then(() => {
        return user.generateAuthToken();
        // res.send(user);
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((err) => res.status(400).send(err));
});

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = {app};