const router = require('express').Router();

const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
} = require('../../controllers/thoughtController.js');

// /api/thoughts - GET all and POST
router.route('/').get(getAllThoughts).post(createThought);

// /api/thoughts/:thoughtId - GET by id, PUT and DELETE
router
  .route('/:thoughtId')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

 // /api/thoughts/:thoughtId/reactions - POST and DELETE
 router.route('/:thoughtId/reactions').post(addReaction).delete(deleteReaction);


module.exports = router;
