const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/Todo');
var { User } = require('./models/User');

const app = express();
const port = process.env.PORT || 3000;

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
        res.send({ todos })
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
            res.send({ todo });
        }).catch((err) =>{
             console.log(err);
             return res.status(400).send();
            });
    }
});

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = { app };