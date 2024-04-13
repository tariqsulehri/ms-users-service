const express =  require('express');
const router =  express.Router();
const userController =  require('../controllers/userController');

router.get("/current_user", userController.getCurrentUser);
router.post("/login", userController.login);


module.exports=router;