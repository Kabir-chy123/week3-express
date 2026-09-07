import {
  listAllCats,
  findCatById,
  findCatsByUserId,
  addCat,
  modifyCat,
  removeCat,
} from '../models/cat-model.js';

const getCatsByUserId = async (req, res, next) => {
  try {
    const cats = await findCatsByUserId(req.params.userId);
    res.json(cats);
  } catch (error) {
    next(error);
  }
};

const getCats = async (req, res, next) => {
  try {
    const cats = await listAllCats();
    res.json(cats);
  } catch (error) {
    next(error);
  }
};

const getCatById = async (req, res, next) => {
  try {
    const cat = await findCatById(req.params.id);

    if (cat) {
      res.json(cat);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
};

const postCat = async (req, res, next) => {
  try {
    const newCat = {
      ...req.body,
      filename: req.file ? req.file.filename : '',
    };

    const result = await addCat(newCat);

    if (result) {
      res.status(201).json({
        message: 'New cat added.',
        result,
      });
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    next(error);
  }
};

const putCat = async (req, res, next) => {
  try {
    const result = await modifyCat(req.body, req.params.id);

    if (result) {
      res.json({
        message: 'Cat item updated.',
      });
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
};

const deleteCat = async (req, res, next) => {
  try {
    const result = await removeCat(req.params.id);

    if (result) {
      res.json({
        message: 'Cat item deleted.',
      });
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
};

export { getCats, getCatById, getCatsByUserId, postCat, putCat, deleteCat };
