const STATUS_CREATED = 201;

const SALT_ROUND = 10;

const regEx = /(https?:\/\/)(w{3}\.)?([a-zA-Z0-9-]{0,63}\.)([a-zA-Z]{2,4})(\/[\w\-._~:/?#[\]@!$&'()*+,;=]#?)?/;

module.exports = {
  STATUS_CREATED,
  SALT_ROUND,
  regEx,
};
