import catItems from '../models/cat-model.js';

const getCats = (req, res) => {
  res.json(catItems);
};

const getCatById = (req, res) => {
  const id = Number(req.params.id);
  const cat = catItems.find((item) => item.cat_id === id);

  if (!cat) {
    return res.sendStatus(404);
  }

  res.json(cat);
};

const addCat = (req, res) => {
  const newCat = req.body;

  catItems.push(newCat);

  res.status(201).json(newCat);
};

const updateCat = (req, res) => {
  res.json({
    message: 'Cat item updated.',
  });
};

const deleteCat = (req, res) => {
  res.json({
    message: 'Cat item deleted.',
  });
};

export { getCats, getCatById, addCat, updateCat, deleteCat };
