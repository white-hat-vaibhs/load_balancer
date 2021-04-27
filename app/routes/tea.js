const express = require('express'); //import express
const router  = express.Router(); 
const teaController = require('../controllers/tea');

//add multer
//added in controller therefore no need to use here
// const multer = require('multer');
// const upload = multer();

//read form data
router.post("/tea", teaController.uploadImg, teaController.newTea);


// category model
router.get('/tea', teaController.getAllTea); 
router.post('/tea', teaController.newTea); 
router.delete('/tea', teaController.deleteAllTea); 


// individual model
router.get('/tea/:name', teaController.getOneTea);
router.post('/tea/:name', teaController.newComment);
router.delete('/tea/:name', teaController.deleteOneTea);


module.exports = router; // export to use in server.js
