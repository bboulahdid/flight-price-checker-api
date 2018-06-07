import app from './main';

import logger from './logger';

const port = process.env.PORT || 3000;

app.listen(port, () => logger.info(`Server listening on port ${port}...`));
