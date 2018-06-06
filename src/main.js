import express from 'express';

import projectInfo from '../package';

const port = process.env.PORT || 3000;
const app = express();

app.get("/status", (req, res) => {
  res.json({
    name: projectInfo.name,
    description: projectInfo.description,
    version: projectInfo.version
  });
});

export default app;
