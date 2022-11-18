const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'Что-то пошло не так в getCards' }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.status(201).send({ data: card });
    })
    .catch(() => res.status(500).send({ message: 'Что-то пошло не так в createCard' }));
};

const deleteCard = (req, res) => {
  Card.findByIdandRemove(req.params.cardId)
    .then((cards) => res.send(cards))
    .catch(() => res.status(500).send({ message: 'Что-то пошло не так в deleteCard' }));
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((like) => {
      res.send({ data: like });
    })
    .catch(() => res.status(500).send({ message: 'Что-то пошло не так в likeCard' }));
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((like) => {
      res.send({ data: like });
    })
    .catch(() => res.status(500).send({ message: 'Что-то пошло не так в dislikeCard' }));
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
