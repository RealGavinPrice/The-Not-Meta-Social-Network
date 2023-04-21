const router = require('express').Router();
// Track these const names to thought-controller
const {
  getAllThoughts,
  getThoughtById,
  addThought,
  updateThought,
  removeThought,
  addReaction,
  removeReaction,
} = require('../../controllers/thoughtController');

//GET all thoughts and POST at api/thoughts
router
  .route('/')
  .get(getAllThoughts)
  .post(addThought);

// GET one thought, UPDATE and DELETE routes api/:thoughtId
router
  .route('/:thoughtId')
  .get(getThoughtById)
  .put(updateThought)
  .delete(removeThought);

// Adding reaction
router
  .route('/:thoughtId/reactions')
  .post(addReaction);

//Deleting reaction
router
  .route('/:thoughtId/reactions/:reactionId')
  .delete(removeReaction);

module.exports = router;