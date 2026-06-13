const express = require('express');
const router = express.Router();

const posts = require('../data/posts');
const postControllers = require('../controllers/postControllers');
//creiamo la lista delle rotte per i nostri post

//index
router.get('/', postControllers.index);

//show
router.get('/:id', postControllers.show);

//store
router.post('/', postControllers.store);

//update
router.put('/:id', postControllers.update);

//modify
router.patch('/:id', postControllers.modify);

//delete
router.delete('/:id', postControllers.destroy);


module.exports = router;