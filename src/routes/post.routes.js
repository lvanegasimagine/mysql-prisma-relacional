const router = require('express').Router();
const { listPost, listPostById, createPost, updatePost, deletePost } = require('../controllers/post.controller');

router.get('/', listPost)
router.get('/:post_id', listPostById);
router.post('/', createPost);
router.put('/:post_id', updatePost);
router.delete('/:post_id', deletePost);

module.exports = router