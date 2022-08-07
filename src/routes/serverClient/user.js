const userRoute = require('express').Router();
const userController = require('../../controllers/user');
const addressController = require('../../controllers/address');
const authMiddleware = require('../../middleware/auth');
const uploadFile = require('../../middleware/uploudMiddelware');
//list route
userRoute.get('/', authMiddleware, userController.getProfileCurrentUser);
userRoute.patch('/', authMiddleware, uploadFile, userController.updateProfileCurrentUser);
// userRoute.get('/address', authMiddleware, addressController.getAllAddressDetail);
userRoute.post('/address', authMiddleware, addressController.createAddressUser);
userRoute.get('/address', authMiddleware, addressController.getAllAddressUser);
userRoute.patch('/address/:idAddress', authMiddleware, addressController.updateAddressUser);

module.exports = userRoute;