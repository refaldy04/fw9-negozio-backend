const chatContent = require('express').Router();

const chatContentController = require('../../controllers/chatContent');

const validationMiddleware = require('../../middleware/validation');
const validationRules = require('../../middleware/profileValidator');

//customer
// users.get('/', userController.getAllUserCustomers);
// users.post('/', validationRules.createClientValidator, validationMiddleware, userController.createUserCustomer);
// users.patch('/:id', validationRules.createClientValidator, validationMiddleware, userController.updateUserCustomer);
// users.delete('/:id', userController.deleteUser);

// //seller
// users.get('/allSellers', userController.getAllUserSellers);
// //admin
// users.get('/allAdmins', userController.getAllUserAdmins);

chatContent.get('/', chatContentController.getAllChat);
chatContent.post('/', validationRules.chatContentValidator, validationMiddleware, chatContentController.createChatContent);
chatContent.patch('/:id', validationRules.chatContentValidator, validationMiddleware, chatContentController.updateChatContent);
chatContent.patch('/delete/:id', validationRules.chatContentValidator, validationMiddleware, chatContentController.deleteChatContent);

module.exports = chatContent;