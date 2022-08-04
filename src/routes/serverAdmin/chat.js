const chat = require('express').Router();
const chatController = require('../../controllers/chat');
const { body } = require('express-validator');

const rules = require('../../middleware/chatValidator');

const validation = require('../../middleware/validation');

chat.get('/', chatController.getAllChat);
chat.get('/:id', chatController.getChatById);
chat.post('/', rules.chatValidator, validation, chatController.createChat);
chat.patch(
  '/:id',
  rules.chatValidator,
  validation,

  chatController.editChat
);
chat.delete('/:id', chatController.deleteChat);

module.exports = chat;
