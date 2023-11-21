// Create web server application with Express.js
// Run the server and test it with Postman

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const comments = [
    {id: 1, content: 'Hello'},
    {id: 2, content: 'World'}
];

app.get('/api/comments', (req, res) => {
    res.send(comments);
});

app.post('/api/comments', (req, res) => {
    const comment = {
        id: comments.length + 1,
        content: req.body.content
    };
    comments.push(comment);
    res.send(comment);
});

app.put('/api/comments/:id', (req, res) => {
    const comment = comments.find(c => c.id === parseInt(req.params.id));
    if (!comment) {
        res.status(404).send('The comment with the given ID was not found.');
        return;
    }
    comment.content = req.body.content;
    res.send(comment);
});

app.delete('/api/comments/:id', (req, res) => {
    const comment = comments.find(c => c.id === parseInt(req.params.id));
    if (!comment) {
        res.status(404).send('The comment with the given ID was not found.');
        return;
    }
    const index = comments.indexOf(comment);
    comments.splice(index, 1);
    res.send(comment);
});

app.listen(3000, () => console.log('Listening on port 3000...'));
