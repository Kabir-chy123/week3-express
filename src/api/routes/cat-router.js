import express from 'express';
import { upload, createThumbnail } from '../../middlewares/upload.js';

import {
  getCats,
  getCatById,
  addCat,
  updateCat,
  deleteCat,
} from '../controllers/cat-controller.js';

const catRouter = express.Router();

catRouter.get('/', getCats);
catRouter.get('/:id', getCatById);

catRouter.post('/', upload.single('image'), createThumbnail, addCat);

catRouter.put('/:id', updateCat);
catRouter.delete('/:id', deleteCat);

export default catRouter;
