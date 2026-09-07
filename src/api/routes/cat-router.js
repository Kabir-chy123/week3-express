import express from 'express';

import { upload, createThumbnail } from '../../middlewares/upload.js';

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

catRouter.post('/', upload.single('cat'), createThumbnail, postCat);

catRouter.put('/:id', putCat);

catRouter.delete('/:id', deleteCat);

export default catRouter;
