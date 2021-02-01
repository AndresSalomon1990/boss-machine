const express = require('express');
const apiRouter = express.Router();

// --- PATH /api/minions
const minionsRouter = require('./routers/minions');
apiRouter.use('/minions', minionsRouter);

// --- PATH /api/ideas
const ideasRouter = require('./routers/ideas');
apiRouter.use('/ideas', ideasRouter);

// --- PATH /api/meetings
const meetingsRouter = require('./routers/meetings');
apiRouter.use('/meetings', meetingsRouter);

module.exports = apiRouter;