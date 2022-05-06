const { Thought, User } = require("../models");

const thoughtController = {
  // Get all thoughts
  getAllThoughts(req, res) {
   Thought.find()
    .then((dbThoughtData) => res.json(dbThoughtData))
    .catch((err) => res.status(400).json(err));
},
  // Get thought by id
  getThoughtById(req, res) {
    Thought.findOne({ _id: req.params.id })
    .select("-__v")
    .then((dbThoughtData) => {
      if (!dbThoughtData) {
        res.status(404).json({ message: "No thought found with this id!" });
        return;
      }
      res.json(dbThoughtData);
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json(err);
    });
  },
  // Create thought
  createThought(req, res) {
  Thought.create(req.body)
    .then((dbThoughtData) => res.json(dbThoughtData))
    .catch((err) => res.status(400).json(err));
},
  // Update a thought
    updateThought(req, res) {
      Thought.findOneAndUpdate({ _id: req.body.id }, { new: true })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought found with this id!" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        return res.status(400).json(err);
      });
    },
  // Delete a thought
  deleteThought(req, res) {
   Thought.findOneAndDelete({ _id: req.params.id })
    .then((dbThoughtData) => {
      if (!dbThoughtData) {
        res.status(404).json({ message: "no thought found with this ID" });
        return;
      }
      res.json(dbThoughtData);
    })
    .catch((err) => res.status(400).json(err));
  },
 // Add a reaction
 addReaction(req, res) {
  console.log("You are adding a reaction");
  Thought.findOneAndUpdate(
    { _id: req.params.id },
    { $addToSet: { reactions: params.reactionId } },
    { new: true }
  )
    .then((dbThoughtData) => res.json(dbThoughtData))
    .catch((err) => res.status(400).json(err));
},
// Remove a reaction
deleteReaction(req, res) {
  Thought.findOneAndUpdate(
    { _id: req.params.id },
    { $pull: { reactions: params.reactionId } },
    { new: true }
  )
    .then((dbThoughtData) => {
      if (!dbThoughtData) {
        res.status(404).json({ message: "No reaction found" });
        return;
      }
      res.json(dbThoughtData);
    })
    .catch((err) => res.status(400).json(err));
},
};

module.exports = thoughtController;