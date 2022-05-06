const { User, Thought} = require('../models');

const userController = {
  // Get all users
  getAllUsers(req, res) {
   User.find()
   .then((dbUserData) => res.json(dbUserData))
   .catch((err) => res.status(400).json(err));
},
  // Get a single user by id
  getUserById(req, res) {
    User.findOne({ _id: req.params.id })
      .select('-__v')
      .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }
        res.json(dbUserData);
    })
      .catch((err) => {
        console.log(err);
        return res.status(400).json(err);
      });
  },
  // Create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(400).json(err));
  },
  // Update user
  updateUser(req, res) {
   User.findOneAndUpdate(
    { _id: req.body.userId },
    { new: true }
  )
  .then(dbUserData => {
    if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
    }
    res.json(dbUserData);
})
  .catch((err) => {
    console.log(err);
    return res.status(400).json(err);
  });
  },

  // Add an assignment to a student
  addAssignment(req, res) {
    console.log('You are adding an assignment');
    console.log(req.body);
    Student.findOneAndUpdate(
      { _id: req.params.studentId },
      { $addToSet: { assignments: req.body } },
      { runValidators: true, new: true }
    )
      .then((student) =>
        !student
          ? res
              .status(404)
              .json({ message: 'No student found with that ID :(' })
          : res.json(student)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Remove assignment from a student
  removeAssignment(req, res) {
    Student.findOneAndUpdate(
      { _id: req.params.studentId },
      { $pull: { assignment: { assignmentId: req.params.assignmentId } } },
      { runValidators: true, new: true }
    )
      .then((student) =>
        !student
          ? res
              .status(404)
              .json({ message: 'No student found with that ID :(' })
          : res.json(student)
      )
      .catch((err) => res.status(500).json(err));
  },
};
