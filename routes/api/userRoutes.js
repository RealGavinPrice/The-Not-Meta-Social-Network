const router = require('express').Router();

// NEED TO ADD CONTROLLER CONSTS
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addToFriendList,
    removefromFriendList
} = require('../../controllers/userController');

//GET all users and POST at api/users
router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

// GET one user, UPDATE and DELETE routes api/users/:id
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

// Adding to friend list
router
    .route('/:userId/friends/:friendId')
    .post(addToFriendList);

// Removing from friend list
router
    .route('/:userId/friends/:friendId')
    .delete(removefromFriendList);


module.exports = router;
