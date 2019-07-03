import express from 'express';
import asyncify from 'express-asyncify';
import httpStatus from 'http-status-codes';

const router = asyncify(express.Router());

router.post('/', async (req, res) => {
  console.log(req.body);
  // throw new Error('bad bad');
  return res.status(httpStatus.OK).json({ name: 123 });
});

export default router;
