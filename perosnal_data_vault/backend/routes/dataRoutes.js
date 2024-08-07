const express = require('express');
const router = express.Router();
const dataController = require("../controller/dataController");
const upload = require('../multer_config'); 
const { authGuard} = require("../middleware/authGurad");

router.post('/add', upload.array('images', 12), authGuard, dataController.createData);

router.get('/view', authGuard, dataController.viewData);

router.get('/user/:userId', authGuard, dataController.getDataById);


router.put('/:dataId', authGuard, dataController.updateData);

router.delete('/:dataId',authGuard,  dataController.deleteData);

module.exports = router;