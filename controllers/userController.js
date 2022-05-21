const mongoose = require("mongoose");
const { User, Thought, reactionSchema } = require("../models");

module.exports = {

    // Get all users
    getUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },

    // Ger a single user by ID
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .select("-__v")
            .populate({ path: 'Thought' })
            .populate({ path: 'reactionSchema' })
            .then(async (user) =>
                !user
                    ? res.status(404).json({ message: "No user with that ID" })
                    : res.json(user)
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },

    // Create a new user
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },

    // Update a user
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with this id!' })
                    : res.json(user)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // Detelet a user
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : Thought.deleteMany({ _id: { $in: user.thoughts } })
            )
            .then(() => res.json({ message: 'User and their thoughts have been deleted!' }))
            .catch((err) => res.status(500).json(err));
    },

    // Add a friend
    addFriend(req, res) {
        console.log("You made a friend!");
        console.log(req.body);
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.body } },
            { runValidators: true, new: true },
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "No user found with that ID :(" })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    // Delete a friend
    removeFriend(req, res) {
        user.findOneAndUpdate(
            { _id: req.params.usertId },
            { $pull: { friends: { friendId: req.params.friendId } } },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res
                        .status(404)
                        .json({ message: "No friend found with that ID :(" })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
};









