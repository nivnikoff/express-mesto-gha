const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  STATUS_CREATED,
  ERROR_BAD_REQUEST,
  ERROR_NOT_FOUND,
  ERROR_SERVER,
} = require('../utils/const');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(ERROR_SERVER).send({ message: 'Что-то пошло не так' }));
};

const getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(ERROR_NOT_FOUND).send({ message: 'Пользователь не найден' });
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(ERROR_BAD_REQUEST).send({ message: 'Некорректный id' });
      }
      return res.status(ERROR_SERVER).send({ message: 'Что-то пошло не так' });
    });
};

const createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  return bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.status(STATUS_CREATED).send({
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      email: user.email,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_BAD_REQUEST).send({ message: 'Некорректные данные пользователя' });
      }
      return res.status(ERROR_SERVER).send({ message: 'Что-то пошло не так' });
    });
};

const updateUserInfo = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        return res.status(ERROR_NOT_FOUND).send({ message: 'Пользователь не найден' });
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_BAD_REQUEST).send({ message: 'Некорректные данные пользователя' });
      }
      return res.status(ERROR_SERVER).send({ message: 'Что-то пошло не так' });
    });
};

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        return res.status(ERROR_NOT_FOUND).send({ message: 'Пользователь не найден' });
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_BAD_REQUEST).send({ message: 'Некорректные данные пользователя' });
      }
      return res.status(ERROR_SERVER).send({ message: 'Что-то пошло не так' });
    });
};

const login = (req, res) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(() => res.status(401).send({ message: 'Неверные почта или пароль' }));
};

const getCurrentUser = (req, res) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        return res.status(ERROR_NOT_FOUND).send({ message: 'Пользователь не найден' });
      }
      return res.status(200).sent({ data: user });
    })
    .catch(() => res.status(ERROR_SERVER).send({ message: 'Что-то пошло не так' }));
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUserInfo,
  updateUserAvatar,
  login,
  getCurrentUser,
};
