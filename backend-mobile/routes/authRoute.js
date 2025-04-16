const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
const WithAuth = require('../middlewares/auth');

router.post('/login', authController.login);

router.get('/profile', WithAuth, (req, res) => {
    const userId = req.userId;

    res.json({ userId });
});



router.post('/register', authController.register);

router.put('/user', WithAuth, authController.updateUser);

router.delete('/user', WithAuth, authController.deleteUser);


module.exports = router;


