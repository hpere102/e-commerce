const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  Tag.findAll({
    include: [
      {
      model: Product, through: ProductTag
      }
    ]
  })
  .then((tags) => {
    res.status(200).json(tags);
  })
  .catch((err) => {
    res.status(500).json(err);
  })
});

router.get('/:id', (req, res) => {
  Tag.findByPk(req.params.id, {
    include: [
      {
        model: Product, through: ProductTag
      }
    ]
  })
  .then((tag) => {
    res.status(200).json(tag);
  })
  .catch((err) => {
    res.status(500).json(err);
  })
});

router.post('/', (req, res) => {
  Tag.create(req.body)
  .then ((newTag) => {
    res.status(200).json(newTag);
  })
  .catch((err) => {
    res.status(500).json(err);
  })
});

router.put('/:id', (req, res) => {
  Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then((update) => {
    res.statusMessage(200).json(update);
  })
  .catch((err) => {
    res.status(500).json("UPDATED!");
  })
});

router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then((deleted) => {
    res.statusMessage(200).json(deleted);
  })
  .catch((err) => {
    res.status(500).json(err);
  })
});

module.exports = router;
