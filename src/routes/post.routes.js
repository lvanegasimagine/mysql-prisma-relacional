const router = require('express').Router();
const { listPost, createPost } = require('../controllers/post.controller');


router.get('/:user_id', listPost);
router.post('/', createPost);

module.exports = router