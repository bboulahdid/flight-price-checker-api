import express from 'express';

import projectInfo from '../package';

const app = express();

app.get('/status', (req, res) => {
  res.json({
    name: projectInfo.name,
    description: projectInfo.description,
    version: projectInfo.version
  });
});

export default app;
