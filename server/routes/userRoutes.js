const express = require('express');
const { registerUser, getall } = require('../controllers/usercontroller');
const router = express.Router();

router.post('/register', registerUser);

router.get('/allusers', getall);

router.get('/', (req, res) => {
  res.send('Hello from user routes');
});

module.exports = router;
