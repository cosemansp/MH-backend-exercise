import express from 'express';
import subRectangle from './subRectangle';

const router = express.Router();

// add all subroutes here
router.use('/sub-rect', subRectangle);

export default router;
