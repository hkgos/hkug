import express from 'express';

import { getTopics } from '../services/topic';

const router = express.Router();

router.route('/topics')
  .get((req, res, next) => {
    getTopics(req.query)
      .then(data => res.status(200).json(data))
      .catch(err => next(err));
  });

export default router;
