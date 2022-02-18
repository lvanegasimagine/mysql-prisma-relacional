const { getUsers, createUser, getUserById, updateUser ,deleteUser } = require('../controllers/user.controller');

const router = require('express').Router();

router.get('/', getUsers);
router.get('/:id_user', getUserById);
router.post('/', createUser);
router.put('/:id_user', updateUser);
router.delete('/:id_user', deleteUser);

module.exports = router;