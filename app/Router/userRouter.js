const userController = require('../Controller/userController');
const userRoute = require('express').Router();

userRoute.post('/api/signup', userController.SignUp);
userRoute.post('/api/login', userController.Login);

module.exports = userRoute;