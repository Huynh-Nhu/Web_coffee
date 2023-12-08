const express = require('express');
const router = express.Router();

//nạp controller
const registerAdminController =require('../app/controllers/AdminRegisterController');

router.use('/create',registerAdminController.create); 





// router.use('/',registerController.createon); 



module.exports = router;