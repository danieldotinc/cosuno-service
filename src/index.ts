import express from 'express';

import startup from './startup';
import logger from './logger';

const PORT = process.env.PORT || 3900;
const app: express.Express = express();

startup(app);

const server = app.listen(PORT, () => logger.info(`Running on ${PORT} ⚡`));

export default server;
