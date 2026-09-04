import catItems from '../models/cat-model.js';

const getCats = (req, res) => {
  res.json(catItems);
};

const getCatById = (req, res) => {
  const id = Number(req.params.id);

  const cat = catItems.find((item) => item.cat_id === id);

  res.json(cat);
};

const addCat = (req, res) => {
  const newCat = req.body;

  catItems.push(newCat);

  res.json(newCat);
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
