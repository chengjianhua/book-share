import express from 'express';

import shareRouter from './share';
import accountsRouter from './accounts';

const apiRouter = new express.Router();

apiRouter.use('/accounts', accountsRouter);
apiRouter.use('/share', shareRouter);

export default apiRouter;
