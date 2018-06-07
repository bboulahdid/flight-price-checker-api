import { Router } from 'express';

import projectInfo from '../../package';

const router = new Router();

router.get('/status', (req, res) => {
  res.json({
    name: projectInfo.name,
    description: projectInfo.description,
    version: projectInfo.version
  });
});

export default router;
