const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const { app } = require('./../server');
const { Todo } = require('./../models/Todo');

const todos = [{
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

beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
});

describe('POST /todos', () => {
    it('should create a new Todo', (done) => {
        let text = 'Test todo text';

        request(app).post('/todos').send({ text }).expect(200).expect((res) => {
            expect(res.body.text).toBe(text);
        }).end((err, res) => {
            if (err) {
                return done(err);
            }

            Todo.find({ text }).then((todos) => {
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe(text);
                done();
            }).catch((err) => done(err));
        });
    });

    it('should not create todo with invalid body data', (done) => {
        request(app).post('/todos').send({}).expect(400).end((err, res) => {
            if (err) {
                return done(err);
            }

            Todo.find().then((todos) => {
                expect(todos.length).toBe(2);
                done();
            }).catch((err) => done(err));
        })
    });
});

describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app).get('/todos').expect(200).expect((res) => {
            expect(res.body.todos.length).toBe(2);
        }).end(done);
    });
});

describe('GET /todos/:id', () => {
    it('should return todo doc', (done) => {
        request(app).get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200).expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            }).end(done);
    });

    it('should return 404 if todo is not found', (done) => {
        let hexId = new ObjectID().toHexString();
        request(app).get(`/todos/${hexId}`)
            .expect(404).end(done);
    });

    it('should return 404 for non object ids', (done) => {
        request(app).get('/todos/123gdsaf231n43').expect(404).end(done);
    });
});

describe('DELETE /todos/:id', () => {
    let hexId = todos[1]._id.toHexString();
    it('should remove a todo', (done) => {
        request(app).delete(`/todos/${hexId}`).expect(200).expect((res) => {
            expect(res.body.todo._id).toBe(hexId);
        }).end((err, res) => {
            if (err) {
                return done(err);
            }

            Todo.findById(hexId).then(todo => {
                console.log('cevas')
                expect(todo).toBe(null);
                done();
            }).catch((err => done(err)));
        });
    });

    it('should retrurn 404 if todo is not found', (done) => {
        let id = new ObjectID().toHexString();
        request(app).delete(`/todos/${id}`).expect(404).end(done);
    });

    it('should retrun 404 if object id is invalid', (done) => {
        request(app).delete(`/todos/12345werasdf`).expect(404).end(done);
    });
});

describe("PATCH /todos/:id", () => {
    it('should update the todo', (done) => {
        //grab id
        let hexId = todos[0]._id.toHexString();
        let text = "This is the new text";
        //update text, set completed true

        request(app).patch(`/todos/${hexId}`).send({ completed: true, text })
            .expect(200).expect((res) => {
                expect(res.body.todo.text).toBe(text);
                expect(res.body.todo.completed).toBe(true);
                expect(typeof res.body.todo.completedAt).toBe('number');
            }).end(done);
        //200
        // text is changed, completed is true, completedAt is a number
    });

    it('should remove completedAt when todo is not completed', (done) => {
        //grab  if of second todo item
        //update text, set completed false
        //200
        // text is changed, completed is false, completedAt is null
        let hexId = todos[1]._id.toHexString();
        let text = "This is the new text";
        //update text, set completed true

        request(app).patch(`/todos/${hexId}`).send({ completed: false, text })
            .expect(200).expect((res) => {
                expect(res.body.todo.text).toBe(text);
                expect(res.body.todo.completed).toBe(false);
                expect(res.body.todo.completedAt).toBe(null);
            }).end(done);
    });
});