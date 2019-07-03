import express from 'express';
import asyncify from 'express-asyncify';
import httpStatus from 'http-status-codes';

import validate from './middleware/validator';
import { splitArray, kadanes2d } from '../services/kadane';

const router = asyncify(express.Router());

const subRectSchema = {
  type: 'object',
  properties: {
    input: {
      type: 'array',
      items: { type: 'number' },
      optional: false,
    },
    rowLength: {
      type: 'number',
      optional: false,
    },
  },
};

router.post('/', validate(subRectSchema), async (req, res) => {
  const array = splitArray(req.body.input, req.body.rowLength);
  const sumLargestSubRectangle = kadanes2d(array);
  return res.status(httpStatus.OK).json({ sumLargestSubRectangle });
});

export default router;
