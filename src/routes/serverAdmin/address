const address=require('express').Router();

const addressController = require('../../controllers/address');

const rules = require('../../middleware/profileValidator');

const validation = require('../../middleware/validation');

address.get('/', addressController.getAllAddress);
address.post('/', rules.addressValidator, validation, addressController.createAddress);
address.patch('/:id',rules.addressValidator, validation, addressController.updateAddress);
address.delete('/:id', addressController.deleteProfiles);
// profiles.get('/:id', profileController.getDetailProfiles);

module.exports= address;