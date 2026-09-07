import express from 'express';
import { body } from 'express-validator';
import { validationErrors } from '../../middlewares/error-handlers.js';

import { upload, createThumbnail } from '../../middlewares/upload.js';
import { authenticateToken } from '../../middlewares/authentication.js';

import {
  getCats,
  getCatById,
  getCatsByUserId,
  postCat,
  putCat,
  deleteCat,
} from '../controllers/cat-controller.js';

const catRouter = express.Router();

catRouter.get('/', getCats);

catRouter.get('/user/:userId', getCatsByUserId);

catRouter.get('/:id', getCatById);

catRouter.post(
  '/',
  authenticateToken,
  upload.single('cat'),
  body('cat_name').trim().isLength({ min: 3, max: 50 }),
  body('weight').isFloat(),
  body('owner').isInt(),
  body('birthdate').isDate(),
  validationErrors,
  createThumbnail,
  postCat,
);

catRouter.put(
  '/:id',
  authenticateToken,
  body('cat_name').optional().trim().isLength({ min: 3, max: 50 }),
  body('weight').optional().isFloat(),
  body('owner').optional().isInt(),
  body('birthdate').optional().isDate(),
  validationErrors,
  putCat,
);

catRouter.delete('/:id', authenticateToken, deleteCat);

export default catRouter;
