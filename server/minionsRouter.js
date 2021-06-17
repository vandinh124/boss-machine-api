const minionsRouter = require('express').Router();

const {
    getAllFromDatabase, 
    getFromDatabaseById, 
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
} = require('./db');

minionsRouter.param('minionId', (req, res, next, id) => {
    const minion = getFromDatabaseById('minions', id);
    if (minion){
        req.minion = minion;
        next();
    }else {
        res.status(404).send();
    }
});

//Get all minions
minionsRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('minions'));
});

//Create minions
minionsRouter.post('/', (req, res, next) => {
    const newMinion = addToDatabase('minions', req.body);
    res.status(201).send(newMinion);
})

//Get minion by Id
minionsRouter.get('/:minionId', (req, res, next) => {
    res.send(req.minion);
});

//Update minion
minionsRouter.put('/:minionId', (req, res, next) => {
    const updatedMinion = updateInstanceInDatabase('minions', req.body);
    res.status(201).send(updatedMinion);
});

//Delete minion
minionsRouter.delete('/:minionId', (req, res, next) => {
    res.send(deleteFromDatabasebyId('minions', req.minion.id));
})

module.exports = minionsRouter;


