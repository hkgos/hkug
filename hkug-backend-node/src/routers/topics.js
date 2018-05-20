import express from 'express';
import cors from 'cors';

import { getTopics } from '../services/topic';

const router = express.Router();

router.use(cors());

router.route('/topics')
  .options(cors())
  .get((req, res, next) => {
    getTopics(req.query)
      .then(data => res.status(200).json(data))
      .catch(err => next(err));
  });

export default router;
