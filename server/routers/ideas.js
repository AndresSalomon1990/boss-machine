const express = require('express');
const ideasRouter = express.Router();
const { 
    addToDatabase,
    getAllFromDatabase,
    getFromDatabaseById,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    } = require('../db');

const checkMillionDollarIdea = require('../checkMillionDollarIdea');

ideasRouter.param('ideaId', (req, res, next, id) => {
    const ideaId = Number(id);
    const idea = getFromDatabaseById('ideas', ideaId);

    if(idea) {
        req.idea = idea;
        next();
    } else {
        res.status(404).send();
    }
});

ideasRouter.get('/', (req, res, next) => {
    res.status(200).send(getAllFromDatabase('ideas'));
});

ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
    const newIdea = addToDatabase('ideas', req.body);
    res.status(201).send(newIdea);
});

ideasRouter.get('/:ideasId', (req, res, next) => {
    res.status(200).send(req.idea);
});

ideasRouter.put('/:ideasId', checkMillionDollarIdea, (req, res, next) => {
    const updatedIdea = updateInstanceInDatabase('ideas', req.body);
    res.send(updatedIdea);
});

ideasRouter.delete('/:ideasId', (req, res, next) => {
    const deletedIdea = deleteFromDatabasebyId('ideas', req.params.ideasId);

    if(deletedIdea) {
        res.status(204).send();
    } else {
        res.status(500).send();
    }
});

module.exports = ideasRouter;