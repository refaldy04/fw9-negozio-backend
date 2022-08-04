const profiles=require('express').Router();

const profileController = require('../../controllers/profile');

const rules = require('../../middleware/profileValidator');

const validation = require('../../middleware/validation');

const uploadFile = require('../../middleware/uploadFile');

profiles.get('/', profileController.getAllProfiles);
//profiles.post('/', profileController.createProfiles);
profiles.post('/', uploadFile, rules.profileValidator, validation, profileController.createProfiles);
profiles.patch('/:id', uploadFile,rules.profileValidator, validation, profileController.updateProfiles);
profiles.delete('/:id', profileController.deleteProfiles);
// profiles.get('/:id', profileController.getDetailProfiles);

module.exports= profiles;