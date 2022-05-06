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

  // Update user by id
  updateUser(req, res) {
   User.findOneAndUpdate(
    { _id: req.body.id },
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
    return res.status(400).json(err)
  });
  },
    // Delete a user
    deleteUser(req, res) {
      User.findOneAndDelete({ _id: req.params.id })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "no user found with this ID" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },
  // Add a friend
  addFriend(req, res) {
    console.log('You are adding a friend');
   User.findOneAndUpdate(
      { _id: req.params.id },
      { $addToSet: { friends: params.friendsId } },
      { new: true }
    )
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => res.status(400).json(err));
},
  // Remove assignment from a student
  removeFriend(req, res) {
   User.findOneAndUpdate(
    { _id: req.params.id },
    { $addToSet: { friends: params.friendsId } },
    { new: true }
  )
      .then((dbUserData) => {
        if (!dbUserData) {
         res.status(404).json({ message: 'No user found with that ID' });
         return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },
};
