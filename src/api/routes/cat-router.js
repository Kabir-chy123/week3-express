import express from 'express';

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
catRouter.post('/', addCat);
catRouter.put('/:id', updateCat);
catRouter.delete('/:id', deleteCat);

export default catRouter;
